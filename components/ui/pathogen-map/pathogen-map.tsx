import { MapResources } from "@/app/pathogen/arbovirus/dashboard/(map)/map-config";
import { getEsriVectorSourceStyle } from "@/utils/mapping-util";
import { useState, useEffect, MutableRefObject, useRef, useMemo } from "react";
import { Map, NavigationControl } from "react-map-gl";
import {
  PathogenMapCursor,
  usePathogenMapMouse,
} from "./use-pathogen-map-mouse";
import {
  PathogenMapPopup,
  PopupContentGenerator,
  PopupInfo,
} from "./pathogen-map-popup";
import {
  PathogenMapSourceAndLayer,
  PathogenMapLayerInfo,
  shouldLayerBeUsedForCountryHighlighting,
} from "./pathogen-map-layer";
import { PathogenCountryHighlightLayer } from "./pathogen-country-highlight-layer";
import { useCountryHighlightLayer } from "./use-country-highlight-layer";
import isEqual from "lodash/isEqual";
import { EsmMapSourceAndLayer } from "./esm-maps";
import { computeClusterMarkers } from "@/app/pathogen/arbovirus/dashboard/(map)/arbo-map-cluster-utils";
import { GenericMapPopUpWidth } from "./map-pop-up/generic-map-pop-up";

export interface MarkerCollection<TClusterPropertyKey extends string> {
  [key: string]: {
    properties: Record<TClusterPropertyKey, number> & {
      latitude: number;
      longitude: number;
    };
    element: JSX.Element;
  }
}

export interface PathogenDataPointPropertiesBase {
  id: string;
  latitude: number | undefined;
  longitude: number | undefined;
}

interface ClusteringEnabledSettings<TClusterPropertyKey extends string> {
  clusteringEnabled: true;
  headerText: string;
  popUpWidth: GenericMapPopUpWidth;
  validClusterPropertyKeys: TClusterPropertyKey[];
  clusterPropertyKeysIncludedInSum: TClusterPropertyKey[];
  clusterProperties: Record<TClusterPropertyKey, unknown>;
  clusterPropertyToColourMap: Record<TClusterPropertyKey, string>;
}

interface ClusteringDisabledSettings {
  clusteringEnabled: false,
}

export type ClusteringSettings<TClusterPropertyKey extends string> = ClusteringEnabledSettings<TClusterPropertyKey> | ClusteringDisabledSettings;

export interface GetPaintForCountriesInput<
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase,
  TAdditionalNonPointData extends Record<string, unknown>
> {
  dataPoints: TPathogenDataPointProperties[];
  additionalNonPointData?: TAdditionalNonPointData[];
}

export type GetPaintForCountriesOutput = {
  countryData: Array<{
    countryAlphaThreeCode: string;
    fill: string;
    opacity: number;
  }>;
  defaults: {
    fill: string;
    opacity: number;
  }
};

interface PathogenMapProps<
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase,
  TAdditionalNonPointData extends Record<string, unknown>,
  TClusterPropertyKey extends string
> {
  id: string;
  baseCursor: PathogenMapCursor;
  layers: PathogenMapLayerInfo[];
  generatePopupContent: PopupContentGenerator<TPathogenDataPointProperties>;
  dataPoints: (TPathogenDataPointProperties & { country: string, countryAlphaThreeCode: string, countryAlphaTwoCode: string })[];
  clusteringSettings: ClusteringSettings<TClusterPropertyKey>;
  additionalNonPointData?: TAdditionalNonPointData[];
  getPaintForCountries: (input: GetPaintForCountriesInput<
    TPathogenDataPointProperties,
    TAdditionalNonPointData
  >) => GetPaintForCountriesOutput;
  sourceId: string;
}

export function PathogenMap<
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase,
  TAdditionalNonPointData extends Record<string, unknown>,
  TClusterPropertyKey extends string
>({
  id,
  baseCursor,
  generatePopupContent,
  layers,
  dataPoints,
  additionalNonPointData,
  clusteringSettings,
  getPaintForCountries,
  sourceId,
}: PathogenMapProps<
  TPathogenDataPointProperties,
  TAdditionalNonPointData,
  TClusterPropertyKey
>) {
  const [popUpInfo, _setPopUpInfo] = useState<
    PopupInfo<TPathogenDataPointProperties>
  >({ visible: false, properties: null, layerId: null });
  const { setPopUpInfoForCountryHighlightLayer } = useCountryHighlightLayer();

  // TODO: might be possible to get rid of this
  const layerForCountryHighlighting = layers.find(layer => shouldLayerBeUsedForCountryHighlighting(layer));

  const setPopUpInfo = (newPopUpInfo: PopupInfo<TPathogenDataPointProperties>) => {
    if(newPopUpInfo.layerId === 'country-highlight-layer') {
      setPopUpInfoForCountryHighlightLayer({
        newPopUpInfo,
        setPopUpInfo: _setPopUpInfo,
        dataPoints
      });

      return;
    }

    _setPopUpInfo(newPopUpInfo);
  }

  const [markersOnScreen, setMarkersOnScreen] = useState<MarkerCollection<TClusterPropertyKey>>({});

  const { cursor, onMouseLeave, onMouseEnter, onMouseDown } =
    usePathogenMapMouse({
      baseCursor,
      layers,
      setPopUpInfo,
    });

  const [mapStyle, setMapStyle] = useState<any>(null);

  useEffect(() => {
    getEsriVectorSourceStyle(MapResources.WHO_BASEMAP).then((mapStyle) =>
      setMapStyle(mapStyle)
    );
  }, []);

  if (!mapStyle) {
    return;
  }

  const onRender = (event: mapboxgl.MapboxEvent) => {
    const map = event.target;
    if (map) {
      const features = map.querySourceFeatures(sourceId) as any as GeoJSON.Feature<
        GeoJSON.Geometry,
        { cluster: boolean, cluster_id: string } & Record<TClusterPropertyKey, number>
      >[];

      if(clusteringSettings.clusteringEnabled === true) {
        // This needs to be standardized. How? Can we be type specific probable not? 
        const newMarkers = computeClusterMarkers({
          features,
          headerText: clusteringSettings.headerText,
          popUpWidth: clusteringSettings.popUpWidth,
          markers: markersOnScreen,
          validClusterPropertyKeys: clusteringSettings.validClusterPropertyKeys,
          clusterPropertyKeysIncludedInSum: clusteringSettings.clusterPropertyKeysIncludedInSum,
          clusterPropertyToColourMap: clusteringSettings.clusterPropertyToColourMap,
          map
        });

        // Only update the state if newMarkers is different from markersOnScreen
        if (!isEqual(newMarkers, markersOnScreen)) {
          setMarkersOnScreen(newMarkers);
        }
      }
    }
  }

  return (
    <Map
      id={id}
      cursor={cursor}
      mapStyle={mapStyle}
      initialViewState={{
        latitude: 10,
        longitude: 30,
        zoom: 2,
      }}
      attributionControl={false}
      scrollZoom={false}
      minZoom={2}
      maxZoom={14}
      interactiveLayerIds={[...layers.map((layer) => layer.id), 'country-highlight-layer']}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onRender={onRender}
    >
      <NavigationControl showCompass={false} />
      <EsmMapSourceAndLayer
        popupLayerId={layerForCountryHighlighting?.id}
      />
      <PathogenCountryHighlightLayer
        additionalNonPointData={additionalNonPointData ?? []}
        getPaintForCountries={getPaintForCountries}
        positionedUnderLayerWithId={layerForCountryHighlighting?.id}
        dataPoints={dataPoints}
      />
      <PathogenMapSourceAndLayer
        layers={layers}
        dataPoints={dataPoints}
        clusteringSettings={clusteringSettings}
        sourceId={sourceId}
      />
      <PathogenMapPopup
        mapId={id}
        popUpInfo={popUpInfo}
        generatePopupContent={generatePopupContent}
      />
      {Object.keys(markersOnScreen).map(
        (id) => markersOnScreen[id]?.element
      )}
    </Map>
  );
}


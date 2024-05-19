import { Layer, Source } from "react-map-gl";
import { PathogenDataPointPropertiesBase } from "./pathogen-map";
import { useEffect, useState } from "react";
import { getEsriVectorSourceStyle } from "@/utils/mapping-util";
import {
  MapResources,
  MapSymbology,
} from "@/app/pathogen/arbovirus/dashboard/(map)/map-config";

interface PathogenCountryHighlightLayerProps<
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase
> {
  positionedUnderLayerWithId: string | undefined;
  dataPoints: (TPathogenDataPointProperties & {countryAlphaThreeCode : string})[];
}

const generatePaintForLayer = <
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase
>(input: {
  dataPoints: (TPathogenDataPointProperties & { countryAlphaThreeCode : string})[];
}) => {
  const { dataPoints } = input;

  const allUniqueCountryCodesWithData = new Set(
    dataPoints.map((dataPoint) => dataPoint.countryAlphaThreeCode)
  );

  const countryColorsAndOpacities = Array.from(
    allUniqueCountryCodesWithData
  ).map((alpha3CountryCode) => ({
    alpha3CountryCode: alpha3CountryCode,
    fill: MapSymbology.CountryFeature.HasData.Color,
    opacity: MapSymbology.CountryFeature.HasData.Opacity,
  }));

  return {
    "fill-color": [
      "match",
      ["get", "CODE"],
      ...countryColorsAndOpacities.flatMap(({ alpha3CountryCode, fill }) => [
        alpha3CountryCode,
        fill,
      ]),
      MapSymbology.CountryFeature.Default.Color,
    ],
    "fill-opacity": [
      "match",
      ["get", "CODE"],
      ...countryColorsAndOpacities.flatMap(({ alpha3CountryCode, opacity }) => [
        alpha3CountryCode,
        opacity,
      ]),
      MapSymbology.CountryFeature.Default.Opacity,
    ],
  };
};

export function PathogenCountryHighlightLayer<
  TPathogenDataPointProperties extends PathogenDataPointPropertiesBase
>({
  positionedUnderLayerWithId,
  dataPoints,
}: PathogenCountryHighlightLayerProps<TPathogenDataPointProperties>) {
  const [mapCountryVectors, setMapCountryVectors] = useState<any>(null);

  useEffect(() => {
    getEsriVectorSourceStyle(MapResources.WHO_COUNTRY_VECTORTILES).then(
      (mapCountryVectors) => {
        setMapCountryVectors(mapCountryVectors);
      }
    );
  }, []);

  if (!mapCountryVectors) {
    return;
  }

  const countryLayer = mapCountryVectors.layers[0];

  return (
    <Source {...mapCountryVectors.sources[countryLayer.source]}>
      <Layer
        {...countryLayer}
        id='country-highlight-layer'
        paint={generatePaintForLayer({ dataPoints })}
        beforeId={positionedUnderLayerWithId}
      />
    </Source>
  );
}

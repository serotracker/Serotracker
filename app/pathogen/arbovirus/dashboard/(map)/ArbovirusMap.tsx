/**
 * @file ArbovirusMap Component
 * @description This component renders a Map for the Arboviruses dashboard.
 * It includes checkboxes for different pathogens and a side panel with additional filters.
 * The map and filters are dynamically updated based on user interactions.
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useContext, useState } from "react";
import { useArboData } from "@/hooks/useArboData";
import { ArbovirusEstimatePopupContent } from "./arbovirus-estimate-pop-up-content";
import { PathogenMap } from "@/components/ui/pathogen-map/pathogen-map";
import { MapArbovirusStudySubmissionPrompt } from "./MapArbovirusStudySubmissionPrompt";
import { ArboCountryPopupContent } from "./ArboCountryPopUpContent";
import { computeClusterMarkers } from "./arbo-map-cluster-utils";
import { MapShadingLegend } from "./MapShadingLegend";
import { ArboContext } from "@/contexts/pathogen-context/pathogen-contexts/arbo-context";
import { MapEstimateSummary } from "@/components/ui/pathogen-map/map-estimate-summary";
import { isPopupCountryHighlightLayerContentGeneratorInput } from "@/components/ui/pathogen-map/pathogen-map-popup";
import { Arbovirus } from "@/gql/graphql";

export const pathogenColorsTailwind: { [key in Arbovirus]: string } = {
  [Arbovirus.Zikv]: "data-[state=checked]:bg-zikv",
  [Arbovirus.Chikv]: "data-[state=checked]:bg-chikv",
  [Arbovirus.Wnv]: "data-[state=checked]:bg-wnv",
  [Arbovirus.Denv]: "data-[state=checked]:bg-denv",
  [Arbovirus.Yf]: "data-[state=checked]:bg-yf",
  [Arbovirus.Mayv]: "data-[state=checked]:bg-mayv",
};

// TODO: Needs to be synced with tailwind pathogen colors. How?
export const pathogenColors: { [key: string]: string } = {
  ZIKV: "#A0C4FF",
  CHIKV: "#9BF6FF",
  WNV: "#CAFFBF",
  DENV: "#FFADAD",
  YF: "#FFD6A5",
  MAYV: "#c5a3ff",
};

export function ArbovirusMap() {
  
  const [ isStudySubmissionPromptVisible, setStudySubmissionPromptVisibility ] = useState(true);
  const state = useContext(ArboContext);
  const { data } = useArboData();

  if (!data) {
    return <span> Loading... </span>;
  }

  return (
    <>
      <div className={"w-full h-full p-0"}>
        <PathogenMap
          id="arboMap"
          baseCursor=""
          sourceId="arbo-[GENERATED-SOURCE-ID]"
          layers={[
            {
              id: "Arbovirus-pins",
              type: "circle",
              isDataUsedForCountryHighlighting: true,
              cursor: "pointer",
              filter: ["!", ["has", "point_count"]],
              layerPaint: {
                "circle-color": [
                  "match",
                  ["get", "pathogen"],
                  "ZIKV",
                  "#A0C4FF",
                  "CHIKV",
                  "#9BF6FF",
                  "WNV",
                  "#CAFFBF",
                  "DENV",
                  "#FFADAD",
                  "YF",
                  "#FFD6A5",
                  "MAYV",
                  "#C5A3FF",
                  "#FFFFFC",
                ],
                "circle-radius": 8,
                "circle-stroke-color": "#333333",
                "circle-stroke-width": 1,
              },
            },
          ]}
          generatePopupContent={(input) => {
            if(isPopupCountryHighlightLayerContentGeneratorInput(input)) {
              return <ArboCountryPopupContent record={input.data} />
            }
          
            return <ArbovirusEstimatePopupContent estimate={input.data} />
          }}
          dataPoints={state.filteredData}
          clusteringSettings={{
            clusteringEnabled: true,
            clusterProperties: {
              ZIKV: ["+", ["case", ["==", ["get", "pathogen"], "ZIKV"], 1, 0]],
              CHIKV: ["+", ["case", ["==", ["get", "pathogen"], "CHIKV"], 1, 0]],
              WNV: ["+", ["case", ["==", ["get", "pathogen"], "WNV"], 1, 0]],
              DENV: ["+", ["case", ["==", ["get", "pathogen"], "DENV"], 1, 0]],
              YF: ["+", ["case", ["==", ["get", "pathogen"], "YF"], 1, 0]],
              MAYV: ["+", ["case", ["==", ["get", "pathogen"], "MAYV"], 1, 0]],
            },
            computeClusterMarkers
          }}
        />
      </div>
      <MapArbovirusStudySubmissionPrompt 
        hidden={!isStudySubmissionPromptVisible}
        onClose={() => setStudySubmissionPromptVisibility(false)}
        className={"absolute bottom-1 left-1 mx-auto w-1/2 text-center bg-white/60 backdrop-blur-md"}
      />
      <MapShadingLegend className={"absolute bottom-1 right-1 mb-1 bg-white/60 backdrop-blur-md"} />
      <MapEstimateSummary filteredData={state.filteredData}/>
    </>
  );
}

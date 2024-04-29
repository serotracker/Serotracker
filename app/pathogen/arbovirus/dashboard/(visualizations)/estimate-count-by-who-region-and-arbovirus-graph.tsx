import { useContext } from "react";
import {
  arbovirusesSF,
  convertArboSFtoArbo,
} from "./recharts";
import { LegendConfiguration, StackedBarChart } from "./stacked-bar-chart";
import { barColoursForArboviruses, sortArboviruses } from "./rechart-utils";
import { ArboContext } from "@/contexts/pathogen-context/pathogen-contexts/arbo-context";

interface EstimateCountByWHORegionAndArbovirusGraphProps {
  legendConfiguration: LegendConfiguration;
}

export const EstimateCountByWHORegionAndArbovirusGraph = (
  props: EstimateCountByWHORegionAndArbovirusGraphProps
) => {
  const state = useContext(ArboContext);

  return (
    <StackedBarChart
      graphId='estimate-count-by-who-region-and-arbovirus-graph'
      data={state.filteredData.filter((dataPoint) => !!dataPoint.unRegion)}
      primaryGroupingFunction={(dataPoint) => dataPoint.whoRegion}
      secondaryGroupingFunction={(dataPoint) =>
        convertArboSFtoArbo(dataPoint.pathogen as arbovirusesSF)
      }
      secondaryGroupingSortFunction={sortArboviruses}
      transformOutputValue={(data) => data.length}
      legendConfiguration={props.legendConfiguration}
      getBarColour={(secondaryKey) => barColoursForArboviruses[secondaryKey]}
    />
  );
}

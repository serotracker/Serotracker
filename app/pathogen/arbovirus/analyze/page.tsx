import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Filters from "@/app/pathogen/arbovirus/dashboard/filters";
import ArboDataTable from "@/app/pathogen/arbovirus/analyze/ArboDataTable";
import { AntibodyPathogenBar, MedianSeroPrevByWHOregion, MedianSeroPrevByWHOregionAndAgeGroup, StudyCountOverTime, StudyCountOverTimeBySampleFrame, Top10CountriesByPathogenStudyCount, WHORegionAndArbovirusBar } from "@/app/pathogen/arbovirus/analyze/recharts";
import clsx from "clsx";

const VisualizationCard = (props: {
  title: string;
  children: React.ReactNode;
  height?: string;
}) => {
  
  
  return (
    <Card className={clsx("mb-4 mr-4 p-4 pt-0", props.height ?? "h-full sm:h-3/4 2xl:h-1/2 relative")}>
      <CardContent className={"px-0 h-full flex flex-col"}>
        <h3 className="py-4 w-full text-center text-lg">{props.title}</h3>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default function ArboAnalyze() {
  return (
    <>
      <div className={"col-span-5 row-span-2 overflow-auto"}>
        <VisualizationCard title={"Estimate count by WHO region and pathogen"}>
          <WHORegionAndArbovirusBar />
        </VisualizationCard>
        <VisualizationCard title={"Estimate count by arbovirus & antibody type"}>
          <AntibodyPathogenBar />
        </VisualizationCard>
        <VisualizationCard title={"Median seroprevalence by WHO Region"} height="h-full">
          <MedianSeroPrevByWHOregion />
        </VisualizationCard>
        <VisualizationCard title={"Median seroprevalence by WHO region and age group"} height="h-full">
          <MedianSeroPrevByWHOregionAndAgeGroup />
        </VisualizationCard>
        <VisualizationCard title={"Cumulative estimate count over time by arbovirus"}>
          <StudyCountOverTime />
        </VisualizationCard>
        <VisualizationCard title={"Cumulative estimate count over time by sample frame"}  height="h-full 2xl:h-3/4">
          <StudyCountOverTimeBySampleFrame/>
        </VisualizationCard>
        <VisualizationCard title={"Top ten countries reporting estimates by arbovirus"} height="h-full">
          <Top10CountriesByPathogenStudyCount />
        </VisualizationCard>
        
        
      </div>
      <div className={"col-span-5 row-span-2 overflow-auto"}>
        <ArboDataTable />
      </div>
      <Card className={"col-span-2 row-span-2"}>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Filters />
        </CardContent>
      </Card>
    </>
  );
}

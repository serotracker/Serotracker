"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";
import { DashboardTopBanner } from "@/components/customs/dashboard-top-banner";
import { isMersSeroprevalenceEstimate, isMersViralEstimate, MersContext, MersSeroprevalenceEstimate, MersViralEstimate } from "@/contexts/pathogen-context/pathogen-contexts/mers/mers-context";
import { formatMersSeroprevalenceEstimateForTable, formatMersViralEstimateForTable } from "./(table)/use-mers-data-table-data";
import { mersSeroprevalenceEstimateColumnConfiguration } from "./(table)/mers-seroprevalence-estimate-data-table";
import { mersViralEstimateColumnConfiguration } from "./(table)/mers-viral-estimates-data-table";

export const cleanEstimateForMersBanner = (
  estimate: MersSeroprevalenceEstimate | MersViralEstimate
) => {
  const {
    primaryEstimateInfo,
    geographicalAreaSubestimates,
    sexSubestimates,
    ageGroupSubestimates,
    animalSpeciesSubestimates,
    testUsedSubestimates,
    timeFrameSubestimates,
    sampleTypeSubestimates,
    animalSamplingContextSubestimates,
    animalSourceLocationSubestimates,
    occupationSubestimates,
    camelExposureLevelSubestimates,
    nomadismSubestimates,
    ...cleanedEstimate
  } = estimate;

  return cleanedEstimate;
}

export const MersBanner = () => {
  const { filteredData }= useContext(MersContext);

  const seroprevalenceEstimateData = useMemo(() => filteredData
    .filter((dataPoint): dataPoint is MersSeroprevalenceEstimate => isMersSeroprevalenceEstimate(dataPoint))
    .map((dataPoint) => formatMersSeroprevalenceEstimateForTable(dataPoint))
    .map((estimate) => cleanEstimateForMersBanner(estimate))
  , [ filteredData ]);

  const viralEstimateData = useMemo(() => filteredData
    .filter((dataPoint): dataPoint is MersViralEstimate => isMersViralEstimate(dataPoint))
    .map((estimate) => formatMersViralEstimateForTable(estimate))
    .map((estimate) => cleanEstimateForMersBanner(estimate))
  , [ filteredData ])

  console.log('seroprevalenceEstimateData', seroprevalenceEstimateData)
  console.log('viralEstimateData', viralEstimateData)

  return <DashboardTopBanner
    headerContent={
      <div>
        <p className="inline"> MERSTracker is a dashboard and platform for MERS serosurveys. We conduct an </p>
        <Link href="/about/about-our-data" className="underline text-link inline">ongoing systematic review</Link>
        <p className="inline"> to track serosurveys (antibody testing-based surveillance efforts) around the world and visualize findings on this dashboard.</p>
      </div>
    }
    downloadCsvButtonOneConfiguration={{
      enabled: true,
      csvDownloadFilename: "merstracker_seroprevalence_dataset",
      buttonContent: "Download CSV with Seroprevalence Estimates",
      filteredData: seroprevalenceEstimateData,
      dataTableRows: mersSeroprevalenceEstimateColumnConfiguration
    }}
    downloadCsvButtonTwoConfiguration={{
      enabled: true,
      csvDownloadFilename: "merstracker_viral_dataset",
      buttonContent: "Download CSV with Viral Estimates",
      filteredData: viralEstimateData,
      dataTableRows: mersViralEstimateColumnConfiguration
    }}
    citationButtonConfiguration={{
      enabled: false
    }}
  />
}

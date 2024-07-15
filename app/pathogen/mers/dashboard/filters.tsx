"use client";

import React, { useContext } from "react";
import { Filters } from "@/components/customs/filters";
import { FilterableField } from "@/components/customs/filters/available-filters";
import { MersContext } from "@/contexts/pathogen-context/pathogen-contexts/mers/mers-context";
import { useMersData } from "@/hooks/mers/useMersData";
import { useMersFilters } from "@/hooks/mers/useMersFilters";
import { useFaoMersEventData } from "@/hooks/mers/useFaoMersEventData";
import { useFaoMersEventFilterOptions } from "@/hooks/mers/useFaoMersEventFilterOptions";
import { useMersEstimatesFilterOptions } from "@/hooks/mers/useMersEstimatesFilters";

interface MersFiltersProps {
  className?: string;
}

export const MersFilters = (props: MersFiltersProps) => {
  const state = useContext(MersContext);
  const { data } = useMersData();
  const { faoMersEvents } = useFaoMersEventData();
  const { data: sharedFilterData } = useMersFilters();
  const { data: eventFilterData } = useFaoMersEventFilterOptions();
  const { data: estimateFilterData } = useMersEstimatesFilterOptions();

  const dataTypeFilters = [
    FilterableField.__typename,
  ];

  const studyLocationFilters = [
    FilterableField.whoRegion,
    FilterableField.unRegion,
    FilterableField.countryAlphaTwoCode,
  ];

  const seroprevalenceEstimateFilters = [
    FilterableField.sourceType,
  ];

  const humanAndAnimalCaseFilters = [
    FilterableField.diagnosisSource,
  ];

  const animalCaseFilters = [
    FilterableField.animalType,
    FilterableField.animalSpecies,
  ];

  const filterSections = [{
    headerText: 'Data Type',
    headerTooltipText: 'Choose whether or not you would like to see seroprevalence estimates or events.',
    includedFilters: dataTypeFilters
  }, {
    headerText: 'Location',
    headerTooltipText: 'Filter on where the study was conducted or the event occurred.',
    includedFilters: studyLocationFilters
  }, {
    headerText: 'Seroprevalence Estimates',
    headerTooltipText: 'Filters that only apply to seroprevalence estimates.',
    includedFilters: seroprevalenceEstimateFilters
  }, {
    headerText: 'Human and Animal Cases',
    headerTooltipText: 'Filters that only apply to both human and animal confirmed cases.',
    includedFilters: humanAndAnimalCaseFilters
  }, {
    headerText: 'Animal Cases',
    headerTooltipText: 'Filters that only apply to confirmed animal cases.',
    includedFilters: animalCaseFilters
  }];

  return (
    <Filters
      className={props.className}
      filterSections={filterSections}
      state={state}
      filterData={{
        ...(sharedFilterData?.mersFilterOptions ? {
          __typename: [
            "MersEstimate",
            "AnimalMersEvent",
            "HumanMersEvent"
          ],
          whoRegion: sharedFilterData.mersFilterOptions.whoRegion,
          unRegion: sharedFilterData.mersFilterOptions.unRegion,
          countryAlphaTwoCode: sharedFilterData.mersFilterOptions.countryIdentifiers.map(({ alphaTwoCode }) => alphaTwoCode)
        } : {}),
        ...(estimateFilterData?.mersEstimatesFilterOptions ? {
          sourceType: estimateFilterData.mersEstimatesFilterOptions.sourceType
        } : {}),
        ...(eventFilterData?.faoMersEventFilterOptions ? {
          diagnosisSource: eventFilterData.faoMersEventFilterOptions.diagnosisSource,
          animalType: eventFilterData.faoMersEventFilterOptions.animalType,
          animalSpecies: eventFilterData.faoMersEventFilterOptions.animalSpecies,
        } : {})
      }}
      data={{
        mersEstimates: data?.mersEstimates ?? [],
        faoMersEventData: faoMersEvents ?? [],
      }}
      resetAllFiltersButtonEnabled={true}
    />
  )
}
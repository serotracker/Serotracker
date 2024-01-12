/**
 * @file Filters Component
 * @description This component renders a set of filters for the Arboviruses dashboard.
 * It includes dropdowns for age group, sex, country, assay, producer, sample frame, antibody, and pathogen.
 * The filters are dynamically updated based on user interactions and are synchronized with the global state.
 * The component fetches arbovirus data and filter options from the API, rendering the filters once the data is available.
 * It uses the ArboContext to manage global state and interacts with the map using the mapboxgl library.
 *
 *
 * @see contexts/arbo-context.tsx
 * @see hooks/useArboData.tsx
 * @see components/customs/multi-select.tsx
 */

"use client";

import {
  ArboActionType,
  ArboContext,
  ArboContextType,
} from "@/contexts/arbo-context";
import { MultiSelect } from "@/components/customs/multi-select";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useArboData } from "@/hooks/useArboData";
import SectionHeader from "@/components/customs/SectionHeader";
import { DatePicker } from "@/components/ui/datepicker";
import { parseISO } from "date-fns";
import { useArboFilters } from "@/hooks/useArboFilters";

// Function to add or update filters with multiple values
const addFilterMulti = (
  value: string[],
  newFilter: string,
  state: ArboContextType,
  data: any
) => {
  state.dispatch({
    type: ArboActionType.UPDATE_FILTER,
    payload: {
      filter: newFilter,
      value: value,
      data: data ? data : [],
    },
  });
};

// Function to build a filter dropdown
const buildFilterDropdown = (
  filter: string,
  placeholder: string,
  state: ArboContextType,
  filterOptions: string[],
  data: any
) => {
  const sortedOptions = filterOptions
    ? filterOptions
        .filter((assay: string | null): assay is string => assay !== null)
        .sort()
    : [];
  if (
    filter === FilterableField.start_date ||
    filter === FilterableField.end_date
  ) {
    return (
      <div className="pb-3" key={filter}>
        <DatePicker
          onChange={(date) => {
            const dateString = date?.toISOString();
            addFilterMulti(dateString ? [dateString] : [], filter, state, data);
          }}
          labelText={placeholder}
          date={
            state.selectedFilters[filter] &&
            state.selectedFilters[filter].length > 0
              ? parseISO(state.selectedFilters[filter][0])
              : undefined
          }
          clearDateFilter={() => {
            state.dispatch({
              type: ArboActionType.UPDATE_FILTER,
              payload: {
                filter: filter,
                value: [],
                data: data ? data : [],
              },
            });
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="pb-3" key={filter}>
        <MultiSelect
          handleOnChange={(value) => addFilterMulti(value, filter, state, data)}
          heading={placeholder}
          selected={state.selectedFilters[filter] ?? []}
          options={sortedOptions}
        />
      </div>
    );
  }
};

export enum FilterableField {
  ageGroup = "ageGroup",
  sex = "sex",
  country = "country",
  assay = "assay",
  producer = "producer",
  sampleFrame = "sampleFrame",
  antibody = "antibody",
  pathogen = "pathogen",
  start_date = "start_date",
  end_date = "end_date",
  whoRegion = "whoRegion",
}

interface FilterSectionProps {
  headerText: string;
  headerTooltipText: string;
  state: ArboContextType;
  fields: FilterableField[];
  filters: any;
  data: any;
  filterableFieldToLabelMap: { [key in FilterableField]: string };
}

const FilterSection = ({
  headerText,
  headerTooltipText,
  fields,
  state,
  filterableFieldToLabelMap,
  filters,
  data,
}: FilterSectionProps) => {
  return (
    <div className="p-0">
      <div>
        <SectionHeader
          header_text={headerText}
          tooltip_text={headerTooltipText}
        />
      </div>
      {fields.map((field) => {
        return buildFilterDropdown(
          field,
          filterableFieldToLabelMap[field],
          state,
          filters[field],
          data ? data.arbovirusEstimates : []
        );
      })}
    </div>
  );
};

interface FiltersProps {
  excludedFields?: FilterableField[];
}

export default function Filters({ excludedFields = [] }: FiltersProps) {
  const state = useContext(ArboContext);
  const filterableFieldToLabelMap: Record<FilterableField, string> = {
    [FilterableField.ageGroup]: "Age Group",
    [FilterableField.sex]: "Sex",
    [FilterableField.country]: "Country",
    [FilterableField.assay]: "Assay",
    [FilterableField.producer]: "Assay Producer",
    [FilterableField.sampleFrame]: "Sample Frame",
    [FilterableField.antibody]: "Antibody",
    [FilterableField.pathogen]: "Arbovirus",
    [FilterableField.start_date]: "Sampling Start Date",
    [FilterableField.end_date]: "Sampling End Date",
    [FilterableField.whoRegion]: "WHO Region",
  };
  const demographicFilters = [
    FilterableField.ageGroup,
    FilterableField.sex,
    FilterableField.sampleFrame,
  ].filter((field) => !excludedFields.includes(field));
  const studyInformationFilters = [
    FilterableField.assay,
    FilterableField.producer,
    FilterableField.whoRegion,
    FilterableField.country,
    FilterableField.antibody,
    FilterableField.pathogen,
    FilterableField.start_date,
    FilterableField.end_date,
  ].filter((field) => !excludedFields.includes(field));

  // Fetch arbovirus data using the useArboData hook
  const { data } = useArboData();

  const { data: filterData } = useArboFilters();

  const resetFilters = () => {
    // Dispatch action to reset filters
    state.dispatch({
      type: ArboActionType.RESET_FILTERS,
      payload: {
        data: data ? data.arbovirusEstimates : [],
      }, // Include an empty object as payload
    });
  };

  if (filterData) {
    return (
      <div>
        <FilterSection
          headerText="Demographic"
          headerTooltipText="Filter on demographic variables, including population group, sex, and age group."
          fields={demographicFilters}
          state={state}
          filters={filterData.arbovirusFilterOptions}
          data={data}
          filterableFieldToLabelMap={filterableFieldToLabelMap}
        />
        <FilterSection
          headerText="Study Information"
          headerTooltipText="Filter on different types of study based metadata"
          fields={studyInformationFilters}
          state={state}
          filters={filterData.arbovirusFilterOptions}
          data={data}
          filterableFieldToLabelMap={filterableFieldToLabelMap}
        />
        <div>
          <button
            className="w-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 font-bold py-2 px-15 rounded"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  } else return <div>Filters Loading...</div>;
}

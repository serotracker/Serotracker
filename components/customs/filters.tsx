import { PathogenContextActionType, PathogenContextType } from "@/contexts/pathogen-context/pathogen-context";
import { ResetFiltersButton } from "./filters/reset-filters-button";
import { FilterableField, useAvailableFilters } from "./filters/available-filters";
import { FilterSection } from "./filters/filter-section";

interface SendFilterChangeDispatchInput<TEstimate extends Record<string, unknown>> {
  value: (string | boolean)[],
  newFilter: string,
  state: PathogenContextType<TEstimate>,
  data: any
}

export type SendFilterChangeDispatch = <TEstimate extends Record<string, unknown>>(
  input: SendFilterChangeDispatchInput<TEstimate>
) => void;

/**
 * Function to add or update filters with multiple values
 * 
 */
const sendFilterChangeDispatch = <TEstimate extends Record<string, unknown>>(
  input: SendFilterChangeDispatchInput<TEstimate>
) => {
  input.state.dispatch({
    type: PathogenContextActionType.UPDATE_FILTER,
    payload: {
      filter: input.newFilter,
      value: input.value,
      data: input.data ? input.data : [],
    },
  });
};

interface FilterSectionConfiguration {
  headerText: string;
  headerTooltipText: string;
  includedFilters: FilterableField[];
}

interface FiltersProps<TEstimate extends Record<string, unknown>> {
  filterSections: FilterSectionConfiguration[]
  state: PathogenContextType<TEstimate>;
  filterData: Record<string, string[] | undefined>;
  data: TEstimate[];
  resetAllFiltersButtonEnabled: boolean;
  className?: string;
}

export const Filters = <TEstimate extends Record<string, unknown>>(props: FiltersProps<TEstimate>) => {
  const { availableFilters } = useAvailableFilters();

  return (
    <div className={props.className}>
      {props.filterSections.map((filterSection) => {
        return (
          <FilterSection
            key={filterSection.headerText}
            headerText={filterSection.headerText}
            headerTooltipText={filterSection.headerTooltipText}
            allFieldInformation={filterSection.includedFilters.map((filter) => availableFilters[filter])}
            state={props.state}
            filters={props.filterData}
            sendFilterChangeDispatch={sendFilterChangeDispatch}
            data={props.data}
          />
        )
      })}
      <ResetFiltersButton
        hidden={!props.resetAllFiltersButtonEnabled}
        state={props.state}
        data={props.data}
      />
    </div>
  );
}
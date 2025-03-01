import { Select } from "@/components/customs/select";
import { PathogenContextState, PathogenContextType } from "@/contexts/pathogen-context/pathogen-context";
import { GenericFilter } from "./generic-filter";
import { TooltipContentRenderingFunction } from "./available-filters";
import { SendFilterChangeDispatch } from "../filters";
import { pipe } from "fp-ts/lib/function";

export enum SelectFilterType {
  BOOLEAN_SELECT = 'BOOLEAN_SELECT',
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
}

export enum BooleanSelectOptionString {
  TRUE = 'TRUE',
  FALSE = 'FALSE'
}

export interface SelectFilterProps<
  TEstimate extends Record<string, unknown>,
  TPathogenContextState extends PathogenContextState<TEstimate>
> {
  filter: string;
  placeholder: string;
  renderTooltipContent: TooltipContentRenderingFunction | undefined;
  sendFilterChangeDispatch: SendFilterChangeDispatch;
  state: PathogenContextType<TEstimate, TPathogenContextState>;
  data: TEstimate[] | Record<string, unknown>;
  selectFilterType: SelectFilterType;
  filterOptions: Array<string | undefined | null>;
  optionToLabelMap: Record<string, string | undefined>;
  optionToSuperOptionFunction?: (option: string) => string;
  sorted?: boolean;
  superOptionToLabelMap?: (superOption: string) => string;
}

export const SelectFilter = <
  TEstimate extends Record<string, unknown>,
  TPathogenContextState extends PathogenContextState<TEstimate>
>(props: SelectFilterProps<TEstimate, TPathogenContextState>) => (
  <GenericFilter
    filter={props.filter}
    state={props.state}
    renderTooltipContent={props.renderTooltipContent}
  >
    <Select
      handleOnChange={(value) => {
        if(props.selectFilterType === SelectFilterType.BOOLEAN_SELECT) {
          if(value.length === 0) {
            return props.sendFilterChangeDispatch({
              value: [],
              newFilter: props.filter,
              state: props.state,
              data: props.data
            });
          }

          return props.sendFilterChangeDispatch({
            value: value[0] === BooleanSelectOptionString.TRUE ? [true] : [false],
            newFilter: props.filter,
            state: props.state,
            data: props.data
          });
        }

        return props.sendFilterChangeDispatch({
          value,
          newFilter: props.filter,
          state: props.state,
          data: props.data
        });
      }}
      heading={props.placeholder}
      selected={props.state.selectedFilters[props.filter] ?? []}
      options={
        props.selectFilterType !== SelectFilterType.BOOLEAN_SELECT
        ? pipe(
          props.filterOptions,
          (data) => data.filter(<T extends unknown>(filterOption: T | undefined | null): filterOption is T => filterOption !== undefined && filterOption !== null),
          props.sorted === undefined || props.sorted === true ? (data) => data.sort() : (data) => data
        ) : [BooleanSelectOptionString.TRUE, BooleanSelectOptionString.FALSE]
      }
      optionToLabelMap={props.optionToLabelMap}
      singleSelect={[SelectFilterType.SINGLE_SELECT, SelectFilterType.BOOLEAN_SELECT].includes(props.selectFilterType)}
      optionToSuperOptionFunction={props.optionToSuperOptionFunction}
      superOptionToLabelMap={props.superOptionToLabelMap}
    />
  </GenericFilter>
)
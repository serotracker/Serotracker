"use client";
import { createContext, useEffect, useMemo } from "react";
import uniqBy from "lodash/uniqBy";
import { PathogenContextActionType, PathogenContextState, PathogenContextType, PathogenDataFetcherProps, PathogenProviders } from "../../pathogen-context";
import { useArboData } from "@/hooks/arbovirus/useArboData";
import { useArboFilters } from "@/hooks/arbovirus/useArboFilters";
import { CountryDataContext } from "../../country-information-context";
import { ArbovirusEstimatesQueryQuery } from "@/gql/graphql";
import { ArbovirusEnvironmentalSuitabilityCountryDataProvider } from "./arbo-environmental-suitability-country-data-context";
import { useArboEnviromentalSuitabilityData } from "@/hooks/arbovirus/useArboEnviromentalSuitabilityData";
import { ArbovirusOropoucheCasesDataProvider } from "./arbo-oropouche-cases-data-context";

export type ArbovirusEstimate = ArbovirusEstimatesQueryQuery['arbovirusEstimates'][number];

const initialArboContextState = {
  filteredData: [],
  selectedFilters: {
    ["pathogen"]: ["DENV", "ZIKV", "CHIKV", "YFV", "WNV", "MAYV", "OROV"],
  },
  dataFiltered: false,
}

type ArbovirusContextState = PathogenContextState<ArbovirusEstimate>;
type ArbovirusContextType = PathogenContextType<ArbovirusEstimate, ArbovirusContextState>;

export const ArboContext = createContext<ArbovirusContextType>({
  ...initialArboContextState,
  dispatch: (obj) => {
    console.debug("dispatch not initialized", obj);
  },
});

const ArboDataFetcher = (props: PathogenDataFetcherProps<ArbovirusEstimate, ArbovirusContextState>): React.ReactNode => {
  const dataQuery = useArboData();

  useEffect(() => {
    if (
      props.state.filteredData.length === 0 &&
      !props.state.dataFiltered &&
      "data" in dataQuery &&
      !!dataQuery.data &&
      typeof dataQuery.data === "object" &&
      "arbovirusEstimates" in dataQuery.data &&
      Array.isArray(dataQuery.data.arbovirusEstimates) &&
      dataQuery.data.arbovirusEstimates.length > 0
    ) {
      props.dispatch({
        type: PathogenContextActionType.INITIAL_DATA_FETCH,
        payload: { data: dataQuery.data.arbovirusEstimates },
      });
    }
  }, [dataQuery]);

  return (
    <>
      {props.children}
    </>
  )
}

const CountryDataProvider = (props: {children: React.ReactNode}) => {
  const { data: filterData } = useArboFilters();
  const { data: esmData } = useArboEnviromentalSuitabilityData();
  const value = useMemo(() => {
    const countriesFromFilters = filterData?.arbovirusFilterOptions.countryIdentifiers.map(({
      name,
      alphaTwoCode,
      alphaThreeCode
    }) => ({
      countryName: name,
      countryAlphaTwoCode: alphaTwoCode,
      countryAlphaThreeCode: alphaThreeCode
    })) ?? []

    const countriesFromEsmData = esmData?.arbovirusEnviromentalSuitabilityData.map(({
      countryAlphaThreeCode,
      countryAlphaTwoCode,
      countryName
    }) => ({
      countryName,
      countryAlphaTwoCode,
      countryAlphaThreeCode
    })) ?? []

    return uniqBy([
      ...countriesFromFilters,
      ...countriesFromEsmData
    ], (country) => country.countryAlphaThreeCode)
  }, [filterData])

  return (
    <CountryDataContext.Provider value={value}>
      {props.children}
    </CountryDataContext.Provider>
  )
}

interface ArboProvidersProps {
  children: React.ReactNode;
}

export const ArboProviders = (props: ArboProvidersProps) => {
  return (
    <PathogenProviders
      initialState={initialArboContextState}
      countryDataProvider={CountryDataProvider}
      context={ArboContext}
      mapId={'arboMap'}
      dataFetcher={ArboDataFetcher}
    >
      <ArbovirusEnvironmentalSuitabilityCountryDataProvider>
        <ArbovirusOropoucheCasesDataProvider>
          {props.children}
        </ArbovirusOropoucheCasesDataProvider>
      </ArbovirusEnvironmentalSuitabilityCountryDataProvider>
    </PathogenProviders>
  )
}
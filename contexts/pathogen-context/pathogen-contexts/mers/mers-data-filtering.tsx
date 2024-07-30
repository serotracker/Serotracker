import { HumanMersAgeGroupSubEstimate, MersEstimate, isAnimalMersEstimate, isHumanMersAgeGroupSubEstimate, isHumanMersEstimate } from "./mers-context"
import { doTimeIntervalsOverlap } from "@/lib/date-utils";
import { parseISO } from "date-fns";
import uniq from "lodash/uniq";

export enum MersFilterableField {
  __typename = "__typename",
  whoRegion = "whoRegion",
  unRegion = "unRegion",
  countryAlphaTwoCode = "countryAlphaTwoCode",
  sourceType = "sourceType",
  samplingStartDate = "samplingStartDate",
  samplingEndDate = "samplingEndDate",
  samplingMethod = "samplingMethod",
  assay = "assay",
  specimenType = "specimenType",
  sex = "sex",
  isotypes = "isotypes",
  ageGroup = "ageGroup",
  sampleFrame = "sampleFrame",
  animalDetectionSettings = "animalDetectionSettings",
  animalPurpose = "animalPurpose",
  animalImportedOrLocal = "animalImportedOrLocal",
  diagnosisSource = "diagnosisSource",
  animalType = "animalType",
  animalSpecies = "animalSpecies"
}

interface FilterMersEstimatesInput {
  mersEstimates: MersEstimate[];
  selectedFilters: Partial<Record<MersFilterableField, string[]>>;
}

interface FilterMersEstimatesOutput {
  filteredMersEstimates: MersEstimate[];
}

interface MersEstimateArrayFieldHandlerInput<TFilterKey extends MersFilterableField> {
  filterKey: TFilterKey;
  estimate: Record<TFilterKey, string[]> & Record<string, unknown>;
  selectedFilters: Record<TFilterKey, string[]>;
}

const mersEstimateArrayFieldHandler = <TFilterKey extends MersFilterableField>(
  input: MersEstimateArrayFieldHandlerInput<TFilterKey>
): boolean => {
  const { selectedFilters, filterKey, estimate } = input;

  if(selectedFilters[filterKey].length === 0) {
    return true;
  }

  return selectedFilters[filterKey].some((valueForFilter) => {
    const valueForEstimate = estimate[filterKey];

    return valueForEstimate.includes(valueForFilter);
  });
}

interface MersEstimateStringFieldHandlerInput<TFilterKey extends MersFilterableField> {
  filterKey: TFilterKey;
  estimate: Partial<Record<TFilterKey, string | null>> & Record<string, unknown>;
  selectedFilters: Record<TFilterKey, string[]>;
}

const mersEstimateStringFieldHandler = <TFilterKey extends MersFilterableField>(
  input: MersEstimateStringFieldHandlerInput<TFilterKey>
): boolean => {
  const { selectedFilters, filterKey, estimate } = input;
  
  if(selectedFilters[filterKey].length === 0) {
    return true;
  }

  return selectedFilters[filterKey].some((valueForFilter) => {
    const valueForEstimate = estimate[filterKey];

    return valueForFilter === valueForEstimate;
  });
}

interface MersEstimateFilteringHandlerOutput {
  included: boolean;
  sexSubestimateIdsToMarkAsFiltered?: string[];
  humanAgeGroupSubestimateIdsToMarkAsFiltered?: string[];
  animalSpeciesSubestimateIdstoMarkAsFiltered?: string[];
  testUsedSubestimateIdstoMarkAsFiltered?: string[];
}

const allMersEstimateHandlers: Record<MersFilterableField, (input: {
  estimate: MersEstimate;
  selectedFilters: Partial<Record<MersFilterableField, string[]>>;
}) => MersEstimateFilteringHandlerOutput> = {
  [MersFilterableField.__typename]: (input) => {
    if((input.selectedFilters[MersFilterableField.__typename] ?? []).length == 0) {
      return { included: false };
    }

    return {
      included: mersEstimateStringFieldHandler({
        filterKey: MersFilterableField.__typename,
        estimate: {
          ...input.estimate,
          __typename: input.estimate.primaryEstimateInfo.__typename
        },
        selectedFilters: {
          ...input.selectedFilters,
          [MersFilterableField.__typename]: input.selectedFilters[MersFilterableField.__typename] ?? []
        }
      })
    }
  },
  [MersFilterableField.assay]: (input) => ({
    included: mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.assay,
      estimate: {
        ...input.estimate,
        assay: input.estimate.primaryEstimateInfo.assay
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.assay]: input.selectedFilters[MersFilterableField.assay] ?? []
      }
    }),
    testUsedSubestimateIdstoMarkAsFiltered: input.estimate.testUsedSubestimates
      .filter((subestimate) =>
        ((input.selectedFilters[MersFilterableField.assay] ?? []).length > 0) &&
        !input.selectedFilters[MersFilterableField.assay]?.some((element) => subestimate.assay.includes(element))
      )
      .map((subestimate) => subestimate.id)
  }),
  [MersFilterableField.isotypes]: (input) => ({
    included: mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.isotypes,
      estimate: {
        ...input.estimate,
        isotypes: input.estimate.primaryEstimateInfo.isotypes
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.isotypes]: input.selectedFilters[MersFilterableField.isotypes] ?? []
      }
    })
  }),
  [MersFilterableField.whoRegion]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.whoRegion,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.whoRegion]: input.selectedFilters[MersFilterableField.whoRegion] ?? []
      }
    })
  }),
  [MersFilterableField.sex]: (input) => ({
    included: mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.sex,
      estimate: {
        ...input.estimate,
        sex: [
          input.estimate.primaryEstimateInfo.sex,
          ...input.estimate.sexSubestimates.map((subestimate) => subestimate.sex)
        ].filter((element): element is NonNullable<typeof element> => !!element)
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.sex]: input.selectedFilters[MersFilterableField.sex] ?? []
      }
    }),
    sexSubestimateIdsToMarkAsFiltered: input.estimate.sexSubestimates
      .filter((subestimate) =>
        ((input.selectedFilters[MersFilterableField.sex] ?? []).length > 0) &&
        !input.selectedFilters[MersFilterableField.sex]?.includes(subestimate.sex)
      )
      .map((subestimate) => subestimate.id)
  }),
  [MersFilterableField.specimenType]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.specimenType,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.specimenType]: input.selectedFilters[MersFilterableField.specimenType] ?? []
      }
    })
  }),
  [MersFilterableField.samplingMethod]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.samplingMethod,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.samplingMethod]: input.selectedFilters[MersFilterableField.samplingMethod] ?? []
      }
    })
  }),
  [MersFilterableField.sourceType]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.sourceType,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.sourceType]: input.selectedFilters[MersFilterableField.sourceType] ?? []
      }
    })
  }),
  [MersFilterableField.countryAlphaTwoCode]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.countryAlphaTwoCode,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.countryAlphaTwoCode]: input.selectedFilters[MersFilterableField.countryAlphaTwoCode] ?? []
      }
    })
  }),
  [MersFilterableField.unRegion]: (input) => ({
    included: mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.unRegion,
      estimate: input.estimate,
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.unRegion]: input.selectedFilters[MersFilterableField.unRegion] ?? []
      }
    })
  }),
  [MersFilterableField.samplingStartDate]: (input) => {
    const samplingStartDateFromFilters = (input.selectedFilters[MersFilterableField.samplingStartDate] ?? []).at(0);

    const included = doTimeIntervalsOverlap(
      {
        intervalStartDate: samplingStartDateFromFilters ? parseISO(samplingStartDateFromFilters) : undefined,
        intervalEndDate: undefined
      },
      {
        intervalStartDate: input.estimate.primaryEstimateInfo.samplingStartDate
          ? parseISO(input.estimate.primaryEstimateInfo.samplingStartDate)
          : undefined,
        intervalEndDate: input.estimate.primaryEstimateInfo.samplingEndDate
          ? parseISO(input.estimate.primaryEstimateInfo.samplingEndDate)
          : undefined
      }
    )

    return {
      included
    }
  },
  [MersFilterableField.samplingEndDate]: (input) => {
    const samplingEndDateFromFilters = (input.selectedFilters[MersFilterableField.samplingEndDate] ?? []).at(0);

    const included = doTimeIntervalsOverlap(
      {
        intervalStartDate: undefined,
        intervalEndDate: samplingEndDateFromFilters ? parseISO(samplingEndDateFromFilters) : undefined,
      },
      {
        intervalStartDate: input.estimate.primaryEstimateInfo.samplingStartDate
          ? parseISO(input.estimate.primaryEstimateInfo.samplingStartDate)
          : undefined,
        intervalEndDate: input.estimate.primaryEstimateInfo.samplingEndDate
          ? parseISO(input.estimate.primaryEstimateInfo.samplingEndDate)
          : undefined
      }
    )

    return {
      included
    }
  },
  [MersFilterableField.animalPurpose]: (input) => {
    const { estimate } = input;

    if(isHumanMersEstimate(estimate)) {
      return { included: true};
    }

    const included = mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.animalPurpose,
      estimate: {
        ...estimate,
        animalPurpose: estimate.primaryEstimateInfo.animalPurpose
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.animalPurpose]: input.selectedFilters[MersFilterableField.animalPurpose] ?? []
      }
    })

    return {
      included
    }
  },
  [MersFilterableField.animalSpecies]: (input) => {
    const { estimate } = input;

    if(isHumanMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.animalSpecies,
      estimate: {
        ...estimate,
        animalSpecies: estimate.primaryEstimateInfo.animalSpecies
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.animalSpecies]: input.selectedFilters[MersFilterableField.animalSpecies] ?? []
      }
    })

    return {
      included,
      animalSpeciesSubestimateIdstoMarkAsFiltered: input.estimate.animalSpeciesSubestimates
        .filter((subestimate) =>
          ((input.selectedFilters[MersFilterableField.animalSpecies] ?? []).length > 0) &&
          !input.selectedFilters[MersFilterableField.animalSpecies]?.includes(subestimate.animalSpecies)
        )
        .map((subestimate) => subestimate.id)
    }
  },
  [MersFilterableField.animalImportedOrLocal]: (input) => {
    const { estimate } = input;

    if(isHumanMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.animalImportedOrLocal,
      estimate: {
        ...estimate,
        animalImportedOrLocal: estimate.primaryEstimateInfo.animalImportedOrLocal
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.animalImportedOrLocal]: input.selectedFilters[MersFilterableField.animalImportedOrLocal] ?? []
      }
    })

    return {
      included
    }
  },
  [MersFilterableField.animalType]: (input) => {
    const { estimate } = input;

    if(isHumanMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.animalType,
      estimate: {
        ...estimate,
        animalType: estimate.primaryEstimateInfo.animalType
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.animalType]: input.selectedFilters[MersFilterableField.animalType] ?? []
      }
    })

    return {
      included
    }
  },
  [MersFilterableField.animalDetectionSettings]: (input) => {
    const { estimate } = input;

    if(isHumanMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.animalDetectionSettings,
      estimate: {
        ...estimate,
        animalDetectionSettings: estimate.primaryEstimateInfo.animalDetectionSettings
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.animalDetectionSettings]: input.selectedFilters[MersFilterableField.animalDetectionSettings] ?? []
      }
    })

    return {
      included
    }
  },
  [MersFilterableField.ageGroup]: (input) => {
    const { estimate } = input;

    if(isAnimalMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateArrayFieldHandler({
      filterKey: MersFilterableField.ageGroup,
      estimate: {
        ...estimate,
        ageGroup: estimate.primaryEstimateInfo.ageGroup
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.ageGroup]: input.selectedFilters[MersFilterableField.ageGroup] ?? []
      }
    })

    return {
      included,
      humanAgeGroupSubestimateIdsToMarkAsFiltered: input.estimate.ageGroupSubestimates
        .filter((subestimate): subestimate is HumanMersAgeGroupSubEstimate => isHumanMersAgeGroupSubEstimate(subestimate))
        .filter((subestimate) =>
          ((input.selectedFilters[MersFilterableField.ageGroup] ?? []).length > 0) &&
          !input.selectedFilters[MersFilterableField.ageGroup]?.some((element) => subestimate.ageGroup.includes(element))
        )
        .map((subestimate) => subestimate.id)
    }
  },
  [MersFilterableField.sampleFrame]: (input) => {
    const { estimate } = input;

    if(isAnimalMersEstimate(estimate)) {
      return { included: true };
    }

    const included = mersEstimateStringFieldHandler({
      filterKey: MersFilterableField.sampleFrame,
      estimate: {
        ...estimate,
        sampleFrame: estimate.primaryEstimateInfo.sampleFrame
      },
      selectedFilters: {
        ...input.selectedFilters,
        [MersFilterableField.sampleFrame]: input.selectedFilters[MersFilterableField.sampleFrame] ?? []
      }
    })

    return {
      included
    }
  },
  [MersFilterableField.diagnosisSource]: () => ({ included: true })
}

export const filterMersEstimates = (input: FilterMersEstimatesInput): FilterMersEstimatesOutput => {
  const allAppliedFilterKeys = Object.keys(input.selectedFilters) as MersFilterableField[];

  const filteredMersEstimates = input.mersEstimates
    .map((estimate) => ({
      estimate,
      appliedFilters: allAppliedFilterKeys.map((filterKey) => {
        const filteringFunction = allMersEstimateHandlers[filterKey];

        const {
          included,
          sexSubestimateIdsToMarkAsFiltered,
          humanAgeGroupSubestimateIdsToMarkAsFiltered,
          animalSpeciesSubestimateIdstoMarkAsFiltered,
          testUsedSubestimateIdstoMarkAsFiltered
        } = filteringFunction({
          estimate,
          selectedFilters: input.selectedFilters
        })

        return {
          included,
          sexSubestimateIdsToMarkAsFiltered,
          humanAgeGroupSubestimateIdsToMarkAsFiltered,
          animalSpeciesSubestimateIdstoMarkAsFiltered,
          testUsedSubestimateIdstoMarkAsFiltered
        }
      })
    }))
    .filter(({ appliedFilters }) => appliedFilters.every((appliedFilter) => appliedFilter.included))
    .map(({ estimate, appliedFilters }) => ({
      estimate,
      sexSubestimateIdsToMarkAsFiltered: uniq(
        appliedFilters.flatMap(({ sexSubestimateIdsToMarkAsFiltered }) => sexSubestimateIdsToMarkAsFiltered)
      ),
      ageGroupSubestimateIdsToMarkAsFiltered: uniq(
        appliedFilters.flatMap(({ humanAgeGroupSubestimateIdsToMarkAsFiltered }) => humanAgeGroupSubestimateIdsToMarkAsFiltered)
      ),
      animalSpeciesSubestimateIdstoMarkAsFiltered: uniq(
        appliedFilters.flatMap(({ animalSpeciesSubestimateIdstoMarkAsFiltered }) => animalSpeciesSubestimateIdstoMarkAsFiltered)
      ),
      testUsedSubestimateIdstoMarkAsFiltered: uniq(
        appliedFilters.flatMap(({ testUsedSubestimateIdstoMarkAsFiltered }) => testUsedSubestimateIdstoMarkAsFiltered)
      )
    }))
    .map(({ estimate, sexSubestimateIdsToMarkAsFiltered, ageGroupSubestimateIdsToMarkAsFiltered, animalSpeciesSubestimateIdstoMarkAsFiltered, testUsedSubestimateIdstoMarkAsFiltered }) => ({
      ...estimate,
      sexSubestimates: estimate.sexSubestimates.map((subestimate) => ({
        ...subestimate,
        markedAsFiltered: sexSubestimateIdsToMarkAsFiltered.includes(subestimate.id)
      })),
      ageGroupSubestimates: estimate.ageGroupSubestimates.map((subestimate) => ({
        ...subestimate,
        markedAsFiltered: ageGroupSubestimateIdsToMarkAsFiltered.includes(subestimate.id)
      })),
      animalSpeciesSubestimates: estimate.animalSpeciesSubestimates.map((subestimate) => ({
        ...subestimate,
        markedAsFiltered: animalSpeciesSubestimateIdstoMarkAsFiltered.includes(subestimate.id)
      })),
      testUsedSubestimates: estimate.testUsedSubestimates.map((subestimate) => ({
        ...subestimate,
        markedAsFiltered: testUsedSubestimateIdstoMarkAsFiltered.includes(subestimate.id)
      }))
    }))
    .filter((estimate) => !(
      (estimate.sexSubestimates.length > 0 && estimate.sexSubestimates.every((subestimate) => subestimate.markedAsFiltered)) &&
      (estimate.ageGroupSubestimates.length > 0 && estimate.ageGroupSubestimates.every((subestimate) => subestimate.markedAsFiltered)) &&
      (estimate.animalSpeciesSubestimates.length > 0 && estimate.animalSpeciesSubestimates.every((subestimate) => subestimate.markedAsFiltered)) &&
      (estimate.testUsedSubestimates.length > 0 && estimate.testUsedSubestimates.every((subestimate) => subestimate.markedAsFiltered))
    ))

  return {
    filteredMersEstimates
  };
}
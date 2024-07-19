/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query arbovirusEstimatesQuery {\n    arbovirusEstimates {\n      ageGroup\n      ageMaximum\n      ageMinimum\n      antibodies\n      antigen\n      assay\n      assayOther\n      city\n      state\n      country\n      countryAlphaTwoCode\n      countryAlphaThreeCode\n      createdAt\n      estimateId\n      id\n      inclusionCriteria\n      latitude\n      longitude\n      pathogen\n      pediatricAgeGroup\n      producer\n      producerOther\n      sameFrameTargetGroup\n      sampleEndDate\n      sampleFrame\n      sampleNumerator\n      sampleSize\n      sampleStartDate\n      seroprevalence\n      seroprevalenceStudy95CILower\n      seroprevalenceStudy95CIUpper\n      seroprevalenceCalculated95CILower\n      seroprevalenceCalculated95CIUpper\n      serotype\n      sex\n      sourceSheetId\n      sourceSheetName\n      unRegion\n      url\n      whoRegion\n    }\n  }\n": types.ArbovirusEstimatesQueryDocument,
    "\n  query arbovirusFilterOptions {\n    arbovirusFilterOptions {\n      ageGroup\n      antibody\n      assay\n      pathogen\n      pediatricAgeGroup\n      producer\n      sampleFrame\n      serotype\n      sex\n      unRegion\n      whoRegion\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n": types.ArbovirusFilterOptionsDocument,
    "\n  query arbovirusDataStatistics {\n    arbovirusDataStatistics {\n        patricipantCount,\n        sourceCount,\n        estimateCount,\n        countryCount\n    }\n  }\n": types.ArbovirusDataStatisticsDocument,
    "\n  query allFaoMersEventPartitionKeys {\n    allFaoMersEventPartitionKeys\n  }\n": types.AllFaoMersEventPartitionKeysDocument,
    "\n  query partitionedFaoMersEvents($input: PartitionedFaoMersEventsInput!) {\n    partitionedFaoMersEvents(input: $input) {\n      partitionKey\n      mersEvents {\n        ... on AnimalMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          animalType\n          animalSpecies\n        }\n        ... on HumanMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          humansAffected\n          humanDeaths\n        }\n      }\n    }\n  }\n": types.PartitionedFaoMersEventsDocument,
    "\n  query faoMersEventFilterOptions {\n    faoMersEventFilterOptions {\n      diagnosisSource\n      animalType\n      animalSpecies\n    }\n  }\n": types.FaoMersEventFilterOptionsDocument,
    "\n  query yearlyFaoCamelPopulationDataPartitionKeys {\n    yearlyFaoCamelPopulationDataPartitionKeys\n  }\n": types.YearlyFaoCamelPopulationDataPartitionKeysDocument,
    "\n  query partitionedYearlyFaoCamelPopulationData($input: PartitionedYearlyFaoCamelPopulationDataInput!) {\n    partitionedYearlyFaoCamelPopulationData(input: $input) {\n      partitionKey\n      yearlyFaoCamelPopulationData {\n        __typename\n        id\n        countryAlphaThreeCode\n        country {\n          alphaThreeCode\n          alphaTwoCode\n          name\n        }\n        whoRegion\n        unRegion\n        year\n        camelCount\n        camelCountPerCapita\n        note\n      }\n    }\n  }\n": types.PartitionedYearlyFaoCamelPopulationDataDocument,
    "\n  query mersEstimates_V2 {\n    mersEstimates_V2 {\n      ... on HumanMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        ageGroup\n      }\n      ... on HumanMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        ageGroup\n      }\n      ... on AnimalMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        animalType\n        animalSpecies\n      }\n      ... on AnimalMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        animalType\n        animalSpecies\n      }\n    }\n  }\n": types.MersEstimates_V2Document,
    "\n  query mersEstimatesFilterOptions {\n    mersEstimatesFilterOptions {\n      sourceType\n    }\n  }\n": types.MersEstimatesFilterOptionsDocument,
    "\n  query mersFilterOptions {\n    mersFilterOptions {\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n      whoRegion\n      unRegion\n    }\n  }\n": types.MersFilterOptionsDocument,
    "\n  query allMonthlySarsCov2CountryInformationPartitionKeys {\n    allMonthlySarsCov2CountryInformationPartitionKeys\n  }\n": types.AllMonthlySarsCov2CountryInformationPartitionKeysDocument,
    "\n  query partitionedMonthlySarsCov2CountryInformation($input: PartitionedMonthlySarsCov2CountryInformationInput!) {\n    partitionedMonthlySarsCov2CountryInformation(input: $input) {\n      partitionKey\n      monthlySarsCov2CountryInformation {\n        population\n        peopleVaccinatedPerHundred\n        peopleFullyVaccinatedPerHundred\n        positiveCasesPerMillionPeople\n        alphaTwoCode\n        alphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        month\n        year\n      }\n    }\n  }\n": types.PartitionedMonthlySarsCov2CountryInformationDocument,
    "\n  query allSarsCov2EstimatePartitionKeys {\n    allSarsCov2EstimatePartitionKeys\n  }\n": types.AllSarsCov2EstimatePartitionKeysDocument,
    "\n  query partitionedSarsCov2Estimates($input: PartitionedSarsCov2EstimatesInput!) {\n    partitionedSarsCov2Estimates(input: $input) {\n      partitionKey\n      sarsCov2Estimates {\n        antibodies\n        isotypes\n        isWHOUnityAligned\n        testType\n        sourceType\n        riskOfBias\n        populationGroup\n        sex\n        ageGroup\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        state\n        studyName\n        scope\n        city\n        id\n        latitude\n        longitude\n        samplingStartDate\n        samplingEndDate\n        samplingMidDate\n        publicationDate\n        countryPeopleVaccinatedPerHundred\n        countryPeopleFullyVaccinatedPerHundred\n        countryPositiveCasesPerMillionPeople\n        denominatorValue\n        numeratorValue\n        seroprevalence\n        estimateName\n        url\n      }\n    }\n  }\n": types.PartitionedSarsCov2EstimatesDocument,
    "\n  query sarsCov2FilterOptions {\n    sarsCov2FilterOptions {\n      ageGroup\n      scope\n      sourceType\n      sex\n      populationGroup\n      riskOfBias\n      unRegion\n      whoRegion\n      antibodies\n      isotypes\n      testType\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n": types.SarsCov2FilterOptionsDocument,
    "\n  query groupedTeamMembers {\n    groupedTeamMembers {\n      label\n      teamMembers {\n        firstName\n        lastName\n        email\n        linkedinUrl\n        twitterUrl\n        affiliations {\n          label\n        }\n        additionalSymbols\n      }\n    }\n  }\n": types.GroupedTeamMembersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query arbovirusEstimatesQuery {\n    arbovirusEstimates {\n      ageGroup\n      ageMaximum\n      ageMinimum\n      antibodies\n      antigen\n      assay\n      assayOther\n      city\n      state\n      country\n      countryAlphaTwoCode\n      countryAlphaThreeCode\n      createdAt\n      estimateId\n      id\n      inclusionCriteria\n      latitude\n      longitude\n      pathogen\n      pediatricAgeGroup\n      producer\n      producerOther\n      sameFrameTargetGroup\n      sampleEndDate\n      sampleFrame\n      sampleNumerator\n      sampleSize\n      sampleStartDate\n      seroprevalence\n      seroprevalenceStudy95CILower\n      seroprevalenceStudy95CIUpper\n      seroprevalenceCalculated95CILower\n      seroprevalenceCalculated95CIUpper\n      serotype\n      sex\n      sourceSheetId\n      sourceSheetName\n      unRegion\n      url\n      whoRegion\n    }\n  }\n"): (typeof documents)["\n  query arbovirusEstimatesQuery {\n    arbovirusEstimates {\n      ageGroup\n      ageMaximum\n      ageMinimum\n      antibodies\n      antigen\n      assay\n      assayOther\n      city\n      state\n      country\n      countryAlphaTwoCode\n      countryAlphaThreeCode\n      createdAt\n      estimateId\n      id\n      inclusionCriteria\n      latitude\n      longitude\n      pathogen\n      pediatricAgeGroup\n      producer\n      producerOther\n      sameFrameTargetGroup\n      sampleEndDate\n      sampleFrame\n      sampleNumerator\n      sampleSize\n      sampleStartDate\n      seroprevalence\n      seroprevalenceStudy95CILower\n      seroprevalenceStudy95CIUpper\n      seroprevalenceCalculated95CILower\n      seroprevalenceCalculated95CIUpper\n      serotype\n      sex\n      sourceSheetId\n      sourceSheetName\n      unRegion\n      url\n      whoRegion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query arbovirusFilterOptions {\n    arbovirusFilterOptions {\n      ageGroup\n      antibody\n      assay\n      pathogen\n      pediatricAgeGroup\n      producer\n      sampleFrame\n      serotype\n      sex\n      unRegion\n      whoRegion\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query arbovirusFilterOptions {\n    arbovirusFilterOptions {\n      ageGroup\n      antibody\n      assay\n      pathogen\n      pediatricAgeGroup\n      producer\n      sampleFrame\n      serotype\n      sex\n      unRegion\n      whoRegion\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query arbovirusDataStatistics {\n    arbovirusDataStatistics {\n        patricipantCount,\n        sourceCount,\n        estimateCount,\n        countryCount\n    }\n  }\n"): (typeof documents)["\n  query arbovirusDataStatistics {\n    arbovirusDataStatistics {\n        patricipantCount,\n        sourceCount,\n        estimateCount,\n        countryCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allFaoMersEventPartitionKeys {\n    allFaoMersEventPartitionKeys\n  }\n"): (typeof documents)["\n  query allFaoMersEventPartitionKeys {\n    allFaoMersEventPartitionKeys\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query partitionedFaoMersEvents($input: PartitionedFaoMersEventsInput!) {\n    partitionedFaoMersEvents(input: $input) {\n      partitionKey\n      mersEvents {\n        ... on AnimalMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          animalType\n          animalSpecies\n        }\n        ... on HumanMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          humansAffected\n          humanDeaths\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query partitionedFaoMersEvents($input: PartitionedFaoMersEventsInput!) {\n    partitionedFaoMersEvents(input: $input) {\n      partitionKey\n      mersEvents {\n        ... on AnimalMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          animalType\n          animalSpecies\n        }\n        ... on HumanMersEvent {\n          __typename\n          id\n          type\n          diagnosisStatus\n          diagnosisSource\n          country {\n            name\n            alphaTwoCode\n            alphaThreeCode\n          }\n          state\n          city\n          latitude\n          longitude\n          whoRegion\n          unRegion\n          observationDate\n          reportDate\n          humansAffected\n          humanDeaths\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query faoMersEventFilterOptions {\n    faoMersEventFilterOptions {\n      diagnosisSource\n      animalType\n      animalSpecies\n    }\n  }\n"): (typeof documents)["\n  query faoMersEventFilterOptions {\n    faoMersEventFilterOptions {\n      diagnosisSource\n      animalType\n      animalSpecies\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query yearlyFaoCamelPopulationDataPartitionKeys {\n    yearlyFaoCamelPopulationDataPartitionKeys\n  }\n"): (typeof documents)["\n  query yearlyFaoCamelPopulationDataPartitionKeys {\n    yearlyFaoCamelPopulationDataPartitionKeys\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query partitionedYearlyFaoCamelPopulationData($input: PartitionedYearlyFaoCamelPopulationDataInput!) {\n    partitionedYearlyFaoCamelPopulationData(input: $input) {\n      partitionKey\n      yearlyFaoCamelPopulationData {\n        __typename\n        id\n        countryAlphaThreeCode\n        country {\n          alphaThreeCode\n          alphaTwoCode\n          name\n        }\n        whoRegion\n        unRegion\n        year\n        camelCount\n        camelCountPerCapita\n        note\n      }\n    }\n  }\n"): (typeof documents)["\n  query partitionedYearlyFaoCamelPopulationData($input: PartitionedYearlyFaoCamelPopulationDataInput!) {\n    partitionedYearlyFaoCamelPopulationData(input: $input) {\n      partitionKey\n      yearlyFaoCamelPopulationData {\n        __typename\n        id\n        countryAlphaThreeCode\n        country {\n          alphaThreeCode\n          alphaTwoCode\n          name\n        }\n        whoRegion\n        unRegion\n        year\n        camelCount\n        camelCountPerCapita\n        note\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query mersEstimates_V2 {\n    mersEstimates_V2 {\n      ... on HumanMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        ageGroup\n      }\n      ... on HumanMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        ageGroup\n      }\n      ... on AnimalMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        animalType\n        animalSpecies\n      }\n      ... on AnimalMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        animalType\n        animalSpecies\n      }\n    }\n  }\n"): (typeof documents)["\n  query mersEstimates_V2 {\n    mersEstimates_V2 {\n      ... on HumanMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        ageGroup\n      }\n      ... on HumanMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        ageGroup\n      }\n      ... on AnimalMersEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        seroprevalence\n        animalType\n        animalSpecies\n      }\n      ... on AnimalMersViralEstimate {\n        __typename\n        id\n        type\n        estimateId\n        city\n        state\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        latitude\n        longitude\n        whoRegion\n        unRegion\n        firstAuthorFullName\n        sourceUrl\n        sourceType\n        sourceTitle\n        insitutution\n        positivePrevalence\n        animalType\n        animalSpecies\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query mersEstimatesFilterOptions {\n    mersEstimatesFilterOptions {\n      sourceType\n    }\n  }\n"): (typeof documents)["\n  query mersEstimatesFilterOptions {\n    mersEstimatesFilterOptions {\n      sourceType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query mersFilterOptions {\n    mersFilterOptions {\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n      whoRegion\n      unRegion\n    }\n  }\n"): (typeof documents)["\n  query mersFilterOptions {\n    mersFilterOptions {\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n      whoRegion\n      unRegion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allMonthlySarsCov2CountryInformationPartitionKeys {\n    allMonthlySarsCov2CountryInformationPartitionKeys\n  }\n"): (typeof documents)["\n  query allMonthlySarsCov2CountryInformationPartitionKeys {\n    allMonthlySarsCov2CountryInformationPartitionKeys\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query partitionedMonthlySarsCov2CountryInformation($input: PartitionedMonthlySarsCov2CountryInformationInput!) {\n    partitionedMonthlySarsCov2CountryInformation(input: $input) {\n      partitionKey\n      monthlySarsCov2CountryInformation {\n        population\n        peopleVaccinatedPerHundred\n        peopleFullyVaccinatedPerHundred\n        positiveCasesPerMillionPeople\n        alphaTwoCode\n        alphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        month\n        year\n      }\n    }\n  }\n"): (typeof documents)["\n  query partitionedMonthlySarsCov2CountryInformation($input: PartitionedMonthlySarsCov2CountryInformationInput!) {\n    partitionedMonthlySarsCov2CountryInformation(input: $input) {\n      partitionKey\n      monthlySarsCov2CountryInformation {\n        population\n        peopleVaccinatedPerHundred\n        peopleFullyVaccinatedPerHundred\n        positiveCasesPerMillionPeople\n        alphaTwoCode\n        alphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        month\n        year\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allSarsCov2EstimatePartitionKeys {\n    allSarsCov2EstimatePartitionKeys\n  }\n"): (typeof documents)["\n  query allSarsCov2EstimatePartitionKeys {\n    allSarsCov2EstimatePartitionKeys\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query partitionedSarsCov2Estimates($input: PartitionedSarsCov2EstimatesInput!) {\n    partitionedSarsCov2Estimates(input: $input) {\n      partitionKey\n      sarsCov2Estimates {\n        antibodies\n        isotypes\n        isWHOUnityAligned\n        testType\n        sourceType\n        riskOfBias\n        populationGroup\n        sex\n        ageGroup\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        state\n        studyName\n        scope\n        city\n        id\n        latitude\n        longitude\n        samplingStartDate\n        samplingEndDate\n        samplingMidDate\n        publicationDate\n        countryPeopleVaccinatedPerHundred\n        countryPeopleFullyVaccinatedPerHundred\n        countryPositiveCasesPerMillionPeople\n        denominatorValue\n        numeratorValue\n        seroprevalence\n        estimateName\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query partitionedSarsCov2Estimates($input: PartitionedSarsCov2EstimatesInput!) {\n    partitionedSarsCov2Estimates(input: $input) {\n      partitionKey\n      sarsCov2Estimates {\n        antibodies\n        isotypes\n        isWHOUnityAligned\n        testType\n        sourceType\n        riskOfBias\n        populationGroup\n        sex\n        ageGroup\n        country\n        countryAlphaTwoCode\n        countryAlphaThreeCode\n        whoRegion\n        unRegion\n        gbdSuperRegion\n        gbdSubRegion\n        state\n        studyName\n        scope\n        city\n        id\n        latitude\n        longitude\n        samplingStartDate\n        samplingEndDate\n        samplingMidDate\n        publicationDate\n        countryPeopleVaccinatedPerHundred\n        countryPeopleFullyVaccinatedPerHundred\n        countryPositiveCasesPerMillionPeople\n        denominatorValue\n        numeratorValue\n        seroprevalence\n        estimateName\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sarsCov2FilterOptions {\n    sarsCov2FilterOptions {\n      ageGroup\n      scope\n      sourceType\n      sex\n      populationGroup\n      riskOfBias\n      unRegion\n      whoRegion\n      antibodies\n      isotypes\n      testType\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query sarsCov2FilterOptions {\n    sarsCov2FilterOptions {\n      ageGroup\n      scope\n      sourceType\n      sex\n      populationGroup\n      riskOfBias\n      unRegion\n      whoRegion\n      antibodies\n      isotypes\n      testType\n      countryIdentifiers {\n        name\n        alphaTwoCode\n        alphaThreeCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query groupedTeamMembers {\n    groupedTeamMembers {\n      label\n      teamMembers {\n        firstName\n        lastName\n        email\n        linkedinUrl\n        twitterUrl\n        affiliations {\n          label\n        }\n        additionalSymbols\n      }\n    }\n  }\n"): (typeof documents)["\n  query groupedTeamMembers {\n    groupedTeamMembers {\n      label\n      teamMembers {\n        firstName\n        lastName\n        email\n        linkedinUrl\n        twitterUrl\n        affiliations {\n          label\n        }\n        additionalSymbols\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
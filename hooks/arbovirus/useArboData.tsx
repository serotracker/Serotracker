import { useQuery } from "@tanstack/react-query";
import { gql } from "@apollo/client";
import { request } from 'graphql-request';
import { ArbovirusEstimatesQueryQuery } from "@/gql/graphql";

export const arbovirusEstimatesQuery = gql`
  query arbovirusEstimatesQuery {
    arbovirusEstimates {
      ageGroup
      ageMaximum
      ageMinimum
      antibodies
      antigen
      assay
      assayOther
      city
      state
      country
      countryAlphaTwoCode
      countryAlphaThreeCode
      createdAt
      estimateId
      id
      inclusionCriteria
      latitude
      longitude
      pathogen
      pediatricAgeGroup
      producer
      producerOther
      sameFrameTargetGroup
      sampleEndDate
      sampleFrame
      sampleNumerator
      sampleSize
      sampleStartDate
      seroprevalence
      seroprevalenceStudy95CILower
      seroprevalenceStudy95CIUpper
      seroprevalenceCalculated95CILower
      seroprevalenceCalculated95CIUpper
      serotype
      sex
      sourceSheetId
      sourceSheetName
      unRegion
      url
      whoRegion
    }
  }
`

export function useArboData() {
  return useQuery<ArbovirusEstimatesQueryQuery>({
    queryKey: ["arbovirusEstimatesQuery"],
    queryFn: () => request('https://iit-backend-v2-git-issue-370-add-partitioned-aad1f1-serotracker.vercel.app/api/graphql' ?? '', arbovirusEstimatesQuery)
  });
}

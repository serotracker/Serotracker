import { DataTable, DropdownTableHeader, RowExpansionConfiguration } from "@/components/ui/data-table/data-table";
import { DataTableColumnConfigurationEntryType, columnConfigurationToColumnDefinitions } from "@/components/ui/data-table/data-table-column-config";
import { MersContext, MersEstimate } from "@/contexts/pathogen-context/pathogen-contexts/mers/mers-context";
import { WhoRegion } from "@/gql/graphql";
import { useContext, useMemo } from "react";
import { AvailableMersDataTables } from "./mers-data-table";
import { useDataTableMapViewingHandler } from "./use-data-table-map-viewing-handler";
import { RechartsVisualization } from "@/components/customs/visualizations/recharts-visualization";
import { MersVisualizationId, getUrlParameterFromVisualizationId, mersVisualizationInformation } from "../../visualizations/visualization-page-config";
import { VisualizationDisplayNameType } from "@/app/pathogen/generic-pathogen-visualizations-page";

const mersSeroprevalenceEstimateColumnConfiguration = [{
  type: DataTableColumnConfigurationEntryType.LINK as const,
  fieldName: 'estimateId',
  label: 'Estimate ID',
  isHideable: false,
  isFixed: true,
  fieldNameForLink: 'url',
  size: 400,
}, {
  type: DataTableColumnConfigurationEntryType.COLOURED_PILL as const,
  fieldName: 'whoRegion',
  label: 'WHO Region',
  valueToColourSchemeClassnameMap: {
    [WhoRegion.Afr]: "bg-who-region-afr",
    [WhoRegion.Amr]: "bg-who-region-amr",
    [WhoRegion.Emr]: "bg-who-region-emr",
    [WhoRegion.Eur]: "bg-who-region-eur",
    [WhoRegion.Sear]: "bg-who-region-sear",
    [WhoRegion.Wpr]: "bg-who-region-wpr text-white"
  },
  defaultColourSchemeClassname: 'bg-sky-100'
}, {
  type: DataTableColumnConfigurationEntryType.STANDARD as const,
  fieldName: 'city',
  label: 'City'
}, {
  type: DataTableColumnConfigurationEntryType.STANDARD as const,
  fieldName: 'state',
  label: 'State'
}, {
  type: DataTableColumnConfigurationEntryType.STANDARD as const,
  fieldName: 'country',
  label: 'Country'
}, {
  type: DataTableColumnConfigurationEntryType.PERCENTAGE as const,
  fieldName: 'seroprevalence',
  label: 'Seroprevalence'
}, {
  type: DataTableColumnConfigurationEntryType.STANDARD as const,
  fieldName: 'sampleSize',
  label: 'Sample Size'
}, {
  type: DataTableColumnConfigurationEntryType.LINK_BUTTON as const,
  fieldName: 'url',
  label: 'Source',
  fieldNameForLink: 'url',
  isSortable: false
}, {
  type: DataTableColumnConfigurationEntryType.STANDARD as const,
  fieldName: 'id',
  label: 'ID',
  isHideable: false,
  initiallyVisible: false
}];

interface MersSeroprevalenceEstimateDataTableProps {
  tableHeader: DropdownTableHeader<AvailableMersDataTables>;
}

export const MersSeroprevalenceEstimateDataTable = (props: MersSeroprevalenceEstimateDataTableProps) => {
  const state = useContext(MersContext);
  const { viewOnMapHandler } = useDataTableMapViewingHandler();

  const rowExpansionConfiguration: RowExpansionConfiguration<MersEstimate> = useMemo(() => ({
    enabled: true,
    generateExpandedRowStatement: ({ data, row }) => 'Clicking on this row in the table again will minimize it',
    visualization: ({ data, row, className }) => {
      const idOfEstimate = row.getValue('id');

      if(!idOfEstimate) {
        return null;
      }

      const estimate = data.find((dataPoint) => dataPoint.id === idOfEstimate);

      if(!estimate) {
        return null;
      }

      const countryName = estimate.country;

      const filteredData = data
        .filter((dataPoint) => dataPoint.country === countryName)

      return (
        <RechartsVisualization
          className="h-full-screen"
          data={filteredData}
          highlightedDataPoint={estimate}
          hideArbovirusDropdown={true}
          visualizationInformation={{
            ...mersVisualizationInformation[MersVisualizationId.MEDIAN_SEROPREVALENCE_OVER_TIME],
            getDisplayName: () => ({
              type: VisualizationDisplayNameType.STANDARD,
              displayName: `Median Seroprevalence for ${countryName} over time`
            })
          }}
          getUrlParameterFromVisualizationId={getUrlParameterFromVisualizationId}
          buttonConfig={{
            downloadButton: {
              enabled: true,
            },
            zoomInButton: {
              enabled: false,
            },
            closeButton: {
              enabled: false,
            }
          }}
        />
      );
    },
    viewOnMapHandler
  }), [ viewOnMapHandler ]);

  return (
    <DataTable
      columns={columnConfigurationToColumnDefinitions({ columnConfiguration: mersSeroprevalenceEstimateColumnConfiguration })}
      csvFilename="merstracker_dataset"
      tableHeader={props.tableHeader}
      csvCitationConfiguration={{
        enabled: false
      }}
      rowExpansionConfiguration={rowExpansionConfiguration}
      data={state.filteredData.map((dataPoint) => ({
        ...dataPoint,
        state: "Alberta",
        city: "Calgary",
        estimateId: "Test Data",
        url: "https://en.wikipedia.org/wiki/MERS",
        seroprevalence: 0.1,
        sampleSize: 100
      }))}
    />
  )
}
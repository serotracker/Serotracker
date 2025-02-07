import { DataTable, DropdownTableHeader, RowExpansionConfiguration } from "@/components/ui/data-table/data-table";
import { columnConfigurationToColumnDefinitions } from "@/components/ui/data-table/data-table-column-config";
import { useContext, useMemo } from "react";
import { AvailableMersDataTables } from "./mers-data-table";
import { useDataTableMapViewingHandler } from "./use-data-table-map-viewing-handler";
import { useVisualizationPageConfiguration } from "../../visualizations/visualization-page-config";
import { useMersEstimateColumnConfiguration } from "./mers-seroprevalence-and-viral-estimates-shared-column-configuration";
import { MersViralEstimateForDataTable } from "./use-mers-data-table-data";
import { MersFilterMetadataContext } from "@/contexts/pathogen-context/pathogen-contexts/mers/mers-filter-metadata-context";
import { ToastId } from "@/contexts/toast-provider";
import { MERSTrackerCitationButtonContent, shortenedMERSTrackerCitationText, suggestedMERSTrackerCitationText } from "../../merstracker-citations";

interface MersViralEstimateDataTableProps {
  tableData: MersViralEstimateForDataTable[];
  tableHeader: DropdownTableHeader<AvailableMersDataTables>;
}

export const MersViralEstimateDataTable = (props: MersViralEstimateDataTableProps) => {
  const { viewOnMapHandler } = useDataTableMapViewingHandler();
  const { dataTableAdditionalButtonConfig } = useContext(MersFilterMetadataContext);

  const { mersViralEstimateColumnConfiguration } = useMersEstimateColumnConfiguration();

  const rowExpansionConfiguration: RowExpansionConfiguration<MersViralEstimateForDataTable> = useMemo(() => ({
    enabled: true,
    generateExpandedRowStatement: (input) => {
      const idOfEstimate = input.row.getValue('id');
      const estimate = idOfEstimate ? input.data.find((dataPoint) => dataPoint.id === idOfEstimate) : undefined;
      const inclusionCriteriaStatement = estimate?.primaryEstimateInfo.studyInclusionCriteria ? `The inclusion criteria for the study was "${estimate.primaryEstimateInfo.studyInclusionCriteria}"` : "No inclusion criteria was specified"
      const exclusionCriteriaStatement = estimate?.primaryEstimateInfo.studyExclusionCriteria ? `The exclusion criteria for the study was "${estimate.primaryEstimateInfo.studyExclusionCriteria}"` : "No exclusion criteria was specified"

      return `${inclusionCriteriaStatement}. ${exclusionCriteriaStatement}. Clicking on this row in the table again will minimize it.`
    },
    visualization: (({ data, row, className }) => null),
    viewOnMapHandler
  }), [ viewOnMapHandler ]);

  const csvCitationConfiguration = useMemo(() => ({
    enabled: true,
    citationText: suggestedMERSTrackerCitationText,
    csvDownloadCitationText: shortenedMERSTrackerCitationText,
    toastId: ToastId.MERSTRACKER_DOWNLOAD_CSV_CITATION_TOAST,
    buttonContent: <MERSTrackerCitationButtonContent />
  }), []);

  return (
    <DataTable
      columns={columnConfigurationToColumnDefinitions({ columnConfiguration: mersViralEstimateColumnConfiguration })}
      csvFilename="merstracker_dataset"
      tableHeader={props.tableHeader}
      csvCitationConfiguration={csvCitationConfiguration}
      additionalButtonConfiguration={dataTableAdditionalButtonConfig}
      secondAdditionalButtonConfiguration={{
        enabled: true,
        buttonText: "Data Dictionary",
        link: "https://airtable.com/app3ebPi0gt39r3xI/shrWqXLuWPhnic2xw"
      }}
      rowExpansionConfiguration={rowExpansionConfiguration}
      data={props.tableData}
    />
  )
}
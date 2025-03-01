import { useMemo } from "react";
import { typedGroupBy, typedObjectEntries, typedObjectFromEntries, typedObjectKeys } from "@/lib/utils";
import { groupDataPointsIntoTimeBuckets, GroupDataPointsIntoTimeBucketsOutput } from "@/lib/time-bucket-grouping";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { Bar, BarChart, CartesianGrid, DefaultTooltipContentProps, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import clsx from "clsx";
import { CustomXAxisTick } from "./custom-x-axis-tick";
import { FullyBoundedTimeInterval } from "@/lib/date-utils";

export interface SplitTimeBucketedBarChartProps<
  TData,
  TPrimaryGroupingKey extends string,
> {
  graphId: string;
  data: TData[];
  primaryGroupingFunction: (dataPoint: TData) => TPrimaryGroupingKey;
  primaryGroupingSortFunction?: (
    a: TPrimaryGroupingKey,
    b: TPrimaryGroupingKey
  ) => number;
  bucketingConfiguration: {
    desiredBucketCount: number;
    validBucketSizes: Array<{
      years: number;
    }>;
  }
  currentPageIndex: number;
  getIntervalStartDate: (dataPoint: TData) => Date;
  getIntervalEndDate: (dataPoint: TData) => Date;
  getBarColour: (primaryKey: TPrimaryGroupingKey, index: number) => string;
  getBarName: (primaryKey: TPrimaryGroupingKey) => string;
  getChartTitle: (primaryKey: TPrimaryGroupingKey) => string;
  percentageFormattingEnabled: boolean;
  transformOutputValue: (data: TData[]) => number;
  tooltipContentOverride?: TooltipProps<any, any>['content'];
  numberOfDigitsAfterDecimalPointForOutputValue: number;
  minimumNumberOfEstimatesForBarToBeIncluded?: number;
}

export const SplitTimeBucketedBarChart = <
  TData,
  TPrimaryGroupingKey extends string,
>(props: SplitTimeBucketedBarChartProps<TData, TPrimaryGroupingKey>) => {
  const { data, primaryGroupingFunction, primaryGroupingSortFunction, getIntervalStartDate, getIntervalEndDate, percentageFormattingEnabled, currentPageIndex, numberOfDigitsAfterDecimalPointForOutputValue, tooltipContentOverride, minimumNumberOfEstimatesForBarToBeIncluded } = props;
  const { desiredBucketCount, validBucketSizes } = props.bucketingConfiguration;

  const eventsGroupedByPrimaryKey = useMemo(() => {
    return typedGroupBy(data, primaryGroupingFunction)
  }, [data, primaryGroupingFunction]);

  const eventsGroupedByPrimaryKeyAndThenTimeBucket = useMemo(() => typedObjectFromEntries(
    typedObjectEntries(eventsGroupedByPrimaryKey).map(
      ([primaryKey, dataPointsForPrimaryKey]): [
        TPrimaryGroupingKey,
        GroupDataPointsIntoTimeBucketsOutput<TData & {
          groupingTimeInterval: FullyBoundedTimeInterval
        }>['groupedDataPoints']
      ] => [
        primaryKey,
        groupDataPointsIntoTimeBuckets({
          dataPoints: dataPointsForPrimaryKey
            .map((dataPoint) => ({
              ...dataPoint,
              groupingTimeInterval: {
                intervalStartDate: getIntervalStartDate(dataPoint),
                intervalEndDate: getIntervalEndDate(dataPoint),
              },
            })),
            desiredBucketCount,
            validBucketSizes
        }).groupedDataPoints,
      ]
    )
    .map(([key, value]): [
      typeof key,
      typeof value
    ] => ([
      key,
      minimumNumberOfEstimatesForBarToBeIncluded !== undefined
        ? value.filter((element) => element.dataPoints.length >= minimumNumberOfEstimatesForBarToBeIncluded)
        : value
    ]))
    .filter(([key, value]) => value.length > 0)
  ), [ eventsGroupedByPrimaryKey, desiredBucketCount, validBucketSizes, getIntervalStartDate, getIntervalEndDate, minimumNumberOfEstimatesForBarToBeIncluded ])

  const yAxisProps = useMemo(() => percentageFormattingEnabled ? {
    domain: [0, 100],
    tickFormatter:(tick: string) => `${tick}%`
  } : {}, [ percentageFormattingEnabled ])

  const tooltipProps = useMemo(() => {
    if(!!tooltipContentOverride) {
      return {
        content: tooltipContentOverride
      }
    }

    if(percentageFormattingEnabled) {
      return {
        itemStyle: {color: "black"},
        formatter: (value: number) => `${value.toFixed(numberOfDigitsAfterDecimalPointForOutputValue)}%`
      }
    }

    return {
      itemStyle: {color: "black"}
    }
  }, [ percentageFormattingEnabled, numberOfDigitsAfterDecimalPointForOutputValue, tooltipContentOverride ])

  const sortedPrimaryKeys = useMemo(() => {
    const unsortedPrimaryKeys = typedObjectKeys(eventsGroupedByPrimaryKeyAndThenTimeBucket);

    if(!primaryGroupingSortFunction) {
      return unsortedPrimaryKeys;
    }

    return unsortedPrimaryKeys.sort((primaryKeyA, primaryKeyB) => primaryGroupingSortFunction(primaryKeyA, primaryKeyB));
  }, [ eventsGroupedByPrimaryKeyAndThenTimeBucket, primaryGroupingSortFunction ])

  const primaryKeysForPage = useMemo(() => {
    const startIndex = currentPageIndex * 6;
    const endIndex = ((currentPageIndex + 1) * 6);

    return sortedPrimaryKeys.slice(startIndex, endIndex);
  }, [ sortedPrimaryKeys, currentPageIndex ]);

  const isLargeScreen = useIsLargeScreen();

  if(primaryKeysForPage.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p> No data. </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex flex-row flex-wrap">
        {primaryKeysForPage.map((primaryKey, index) => {
          const dataForType = eventsGroupedByPrimaryKeyAndThenTimeBucket[primaryKey].map(({interval, dataPoints}) => ({
            intervalAsString: interval.intervalStartDate.getFullYear() !== interval.intervalEndDate.getFullYear() ?
              `${interval.intervalStartDate.getFullYear()}-${interval.intervalEndDate.getFullYear()}` :
              `${interval.intervalStartDate.getFullYear()}`,
            dataPoints,
            valueForBar: props.transformOutputValue(dataPoints),
            numberOfDataPointsInBar: dataPoints.length
          }));

          const numberOfSubgraphsDisplayed = Object.keys(eventsGroupedByPrimaryKeyAndThenTimeBucket).length;

          const width = numberOfSubgraphsDisplayed < 3 ? "w-full" : "w-1/2 lg:w-1/3";
          const height =
            numberOfSubgraphsDisplayed === 1
              ? "h-full"
              : "h-1/3 lg:h-1/2"
            

          return (
            <div
              className={clsx(width, height)}
              key={`${props.graphId}-${primaryKey}`}
            >
              <p className="w-full text-center ">
                {props.getChartTitle(primaryKey)}
              </p>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  margin={{
                    top: 10,
                    right: 10,
                    left: index % 2 === 0 ? 0 : 40,
                    bottom: 40,
                  }}
                  data={dataForType}
                  width={500}
                  height={450}
                  barCategoryGap={1}
                  barGap={0}
                >
                  <CartesianGrid />
                  <XAxis
                    dataKey="intervalAsString"
                    interval={0}
                    tick={(props) => CustomXAxisTick({...props, tickSlant: 35 })}
                    hide={isLargeScreen === false || isLargeScreen === undefined}
                  />
                  <YAxis {...yAxisProps}/>
                  <Bar
                    dataKey="valueForBar"
                    fill={props.getBarColour(primaryKey, index)}
                    name={props.getBarName(primaryKey)}
                  />
                  <Tooltip {...tooltipProps} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
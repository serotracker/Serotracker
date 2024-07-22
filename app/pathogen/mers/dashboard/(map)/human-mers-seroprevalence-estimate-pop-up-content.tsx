import { useMemo } from 'react';
import { GenericMapPopUp, GenericMapPopUpWidth, HeaderConfigurationTextAlignment } from "@/components/ui/pathogen-map/map-pop-up/generic-map-pop-up";
import { PopUpContentRowType } from "@/components/ui/pathogen-map/map-pop-up/pop-up-content-rows";
import { HumanMersSeroprevalenceEstimateMapMarkerData, ageGroupToColourClassnameMap, getHumanMersEstimateRows, getSharedMersEstimateRows } from "./shared-mers-map-pop-up-variables";

interface HumanMersSeroprevalenceEstimatePopupContentProps {
  estimate: HumanMersSeroprevalenceEstimateMapMarkerData;
}

export const HumanMersSeroprevalenceEstimatePopupContent = (props: HumanMersSeroprevalenceEstimatePopupContentProps) => {
  const { estimate } = props;

  const topBannerText = useMemo(() => {
    const seroprevalencePercentageText = `Seroprevalence: ${(estimate.seroprevalence * 100).toFixed(1)}%`;

    return `${seroprevalencePercentageText}`
  }, [ estimate ]);

  return (
    <GenericMapPopUp
      width={GenericMapPopUpWidth.EXTRA_WIDE}
      headerConfiguration={{
        text: "Human Seroprevalence Estimate",
        textAlignment: HeaderConfigurationTextAlignment.CENTER
      }}
      subtitleConfiguration={{
        enabled: true,
        text: props.estimate.sourceTitle,
        link: props.estimate.sourceUrl ?? undefined
      }}
      topBannerConfiguration={{
        enabled: true,
        bannerText: topBannerText,
        bannerColourClassname: 'bg-mers-human-estimate',
        isTextBolded: true,
        isTextCentered: false
      }}
      rows={[
        ...getSharedMersEstimateRows(props.estimate),
        ...getHumanMersEstimateRows(props.estimate)
      ]}
      bottomBannerConfiguration={{
        enabled: false
      }}
    />
  );
}
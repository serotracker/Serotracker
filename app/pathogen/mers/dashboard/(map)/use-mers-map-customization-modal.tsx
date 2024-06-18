import { useMemo, useState } from "react";
import { ModalState, ModalType, useModal } from "@/components/ui/modal/modal";
import { CustomizationSettingType } from "@/components/ui/modal/customization-modal/customization-settings";
import { MapCustomizeButton } from "@/components/ui/pathogen-map/map-customize-button";

enum MersMapCountryHighlightingSettings {
  EVENTS_AND_ESTIMATES = 'EVENTS_AND_ESTIMATES',
  TOTAL_CAMEL_POPULATION = 'TOTAL_CAMEL_POPULATION',
  CAMELS_PER_CAPITA = 'CAMELS_PER_CAPITA'
}

export const useMersMapCustomizationModal = () => {
  const [
    currentMapCountryHighlightingSettings,
    setCurrentMapCountryHighlightingSettings
  ] = useState<MersMapCountryHighlightingSettings>(MersMapCountryHighlightingSettings.EVENTS_AND_ESTIMATES);

  const {
    modal: customizationModal,
    setModalState: setCustomizationModalState,
  } = useModal({
    initialModalState: ModalState.CLOSED,
    headerText: "Customize Map",
    modalType: ModalType.CUSTOMIZATION_MODAL,
    content: {
      customizationSettings: [{
        type: CustomizationSettingType.DROPDOWN,
        dropdownName: 'Country Highlighting',
        primaryColourClassname: 'mers',
        hoverColourClassname: 'mersHover',
        dropdownOptionGroups: [{
          groupHeader: 'Events and estimates',
          options: [
            MersMapCountryHighlightingSettings.EVENTS_AND_ESTIMATES
          ]
        }, {
          groupHeader: 'Camels',
          options: [
            MersMapCountryHighlightingSettings.TOTAL_CAMEL_POPULATION,
            MersMapCountryHighlightingSettings.CAMELS_PER_CAPITA,
          ]
        }],
        chosenDropdownOption: currentMapCountryHighlightingSettings,
        dropdownOptionToLabelMap: {
          [MersMapCountryHighlightingSettings.EVENTS_AND_ESTIMATES]: "Presence of MERS events or seroprevalence estimates",
          [MersMapCountryHighlightingSettings.TOTAL_CAMEL_POPULATION]: "Total camel population",
          [MersMapCountryHighlightingSettings.CAMELS_PER_CAPITA]: "Camels per capita",
        },
        onDropdownOptionChange: (option) => setCurrentMapCountryHighlightingSettings(option)
      }]
    }
  });

  const mapCustomizeButton = useMemo(() => <MapCustomizeButton onClick={() => setCustomizationModalState(ModalState.OPENED)} />, [])

  return {
    customizationModal,
    mapCustomizeButton: () => mapCustomizeButton
  }
}
export enum CardType {
  FIXED = 'FIXED',
  EXPANDABLE = 'EXPANDABLE',
  FILL_REMAINING_SPACE = 'FILL_REMAINING_SPACE'
}

export enum CardStyle {
  DIV = 'DIV',
  CARD = 'CARD',
}

interface CardInputDataBase {
  type: CardType,
  // order determines where the card will be positioned. Cards with higher order values will be placed to the right of cards with lower order values.
  order: number,
  cardId: string,
  renderCardContent: (input: {cardConfigurations: CardConfiguration[]}) => React.ReactNode,
  cardClassname: string,
  cardStyle: CardStyle,
}

// FIXED cards will always take up "columnCount" columns
export type FixedCardInputData = CardInputDataBase & {
  type: CardType.FIXED,
  columnCount: number,
}

// EXPANDABLE cards take up either "expandedColumnCount" columns or no columns depending on whether they are expanded or not
export type ExpandableCardInputData = CardInputDataBase & {
  type: CardType.EXPANDABLE,
  expandedColumnCount: number,
  isExpandedByDefault: boolean,
  onCardSizeChange?: () => void,
}

// FILL_REMAINING_SPACE cards take up the number of columns needed to make the total meet the "columnCountToFill" of the card collection.
// If there's two cards with FILL_REMAINING_SPACE they split the remaining space evenly.
export type FillRemainingSpaceCardInputData = CardInputDataBase & {
  type: CardType.FILL_REMAINING_SPACE,
  onCardSizeChange?: () => void,
}

export type CardInputData = FixedCardInputData | ExpandableCardInputData | FillRemainingSpaceCardInputData;

interface CardStateExtraFields {
  currentColumnCount: number;
}
export type FixedCardState = FixedCardInputData & CardStateExtraFields;
export type ExpandableCardState = ExpandableCardInputData & CardStateExtraFields & { isExpanded: boolean };
export type FillRemainingSpaceCardState = FillRemainingSpaceCardInputData & CardStateExtraFields;
export type CardState = FixedCardState | ExpandableCardState | FillRemainingSpaceCardState;
export type CardStateWithoutCurrentColumnCount = Omit<FixedCardState, 'currentColumnCount'> | Omit<ExpandableCardState, 'currentColumnCount'> | Omit<FillRemainingSpaceCardState, 'currentColumnCount'>;

interface CardConfigurationExtraFields {}
export type FixedCardConfiguration = FixedCardState & CardConfigurationExtraFields;
export type ExpandableCardConfiguration = ExpandableCardState & CardConfigurationExtraFields & { minimizeCard: () => void, expandCard: () => void }
export type FillRemainingSpaceCardConfiguration = FillRemainingSpaceCardState & CardConfigurationExtraFields;
export type CardConfiguration = FixedCardConfiguration | ExpandableCardConfiguration | FillRemainingSpaceCardConfiguration;

export const isFixedCardInputData = (cardInputData: CardInputData): cardInputData is FixedCardInputData => cardInputData.type === CardType.FIXED;
export const isExpandableCardInputData = (cardInputData: CardInputData): cardInputData is ExpandableCardInputData => cardInputData.type === CardType.EXPANDABLE;
export const isFillRemainingSpaceCardInputData = (cardInputData: CardInputData): cardInputData is FillRemainingSpaceCardInputData => cardInputData.type === CardType.FILL_REMAINING_SPACE;

export const isFixedCardState = (cardState: CardState): cardState is FixedCardState => cardState.type === CardType.FIXED;
export const isExpandableCardState = (cardState: CardState): cardState is ExpandableCardState => cardState.type === CardType.EXPANDABLE;
export const isFillRemainingSpaceCardState = (cardState: CardState): cardState is FillRemainingSpaceCardState => cardState.type === CardType.FILL_REMAINING_SPACE;

export const isFixedCardStateWithoutCurrentColumnCount = (cardState: CardStateWithoutCurrentColumnCount): cardState is Omit<FixedCardState, 'currentColumnCount'> => cardState.type === CardType.FIXED;
export const isExpandableCardStateWithoutCurrentColumnCount = (cardState: CardStateWithoutCurrentColumnCount): cardState is Omit<ExpandableCardState,'currentColumnCount'> => cardState.type === CardType.EXPANDABLE;
export const isFillRemainingSpaceCardStateWithoutCurrentColumnCount = (cardState: CardStateWithoutCurrentColumnCount): cardState is Omit<FillRemainingSpaceCardState,'currentColumnCount'> => cardState.type === CardType.FILL_REMAINING_SPACE;

export const isFixedCardConfiguration = (cardConfiguration: CardConfiguration): cardConfiguration is FixedCardConfiguration => cardConfiguration.type === CardType.FIXED;
export const isExpandableCardConfiguration = (cardConfiguration: CardConfiguration): cardConfiguration is ExpandableCardConfiguration => cardConfiguration.type === CardType.EXPANDABLE;
export const isFillRemainingSpaceCardConfiguration = (cardConfiguration: CardConfiguration): cardConfiguration is FillRemainingSpaceCardConfiguration => cardConfiguration.type === CardType.FILL_REMAINING_SPACE;

const findCardOrThrow = (
  cardConfigurations: CardConfiguration[],
  cardId: string
) => {
  const card = cardConfigurations.find((element) => element.cardId === cardId);

  if (!card) {
    throw new Error(`Unable to find card with id ${cardId}.`);
  }

  return card;
};

const getCardConfigurationByTypeFunctionMap = {
  [CardType.EXPANDABLE]: (cardConfigurations: CardConfiguration[], cardId: string): ExpandableCardConfiguration => {
    const cardConfiguration = findCardOrThrow(cardConfigurations, cardId);

    if (!isExpandableCardConfiguration(cardConfiguration)) {
      throw new Error(`Attempted to find card with id of ${cardId} and type ${CardType.EXPANDABLE}. Card found but type was ${cardConfiguration.type}.`);
    }

    return cardConfiguration;
  },
  [CardType.FILL_REMAINING_SPACE]: (cardConfigurations: CardConfiguration[], cardId: string): FillRemainingSpaceCardConfiguration => {
    const cardConfiguration = findCardOrThrow(cardConfigurations, cardId);

    if (!isFillRemainingSpaceCardConfiguration(cardConfiguration)) {
      throw new Error(`Attempted to find card with id of ${cardId} and type ${CardType.FILL_REMAINING_SPACE}. Card found but type was ${cardConfiguration.type}.`);
    }

    return cardConfiguration;
  },
  [CardType.FIXED]: (cardConfigurations: CardConfiguration[], cardId: string): FixedCardConfiguration => {
    const cardConfiguration = findCardOrThrow(cardConfigurations, cardId);

    if (!isFixedCardConfiguration(cardConfiguration)) {
      throw new Error(`Attempted to find card with id of ${cardId} and type ${CardType.FIXED}. Card found but type was ${cardConfiguration.type}.`);
    }

    return cardConfiguration;
  },
} as const;

export const getConfigurationForCard = <T extends CardType>(cardConfigurations: CardConfiguration[], cardId: string, cardType: T): ReturnType<(typeof getCardConfigurationByTypeFunctionMap)[T]> => {
  return getCardConfigurationByTypeFunctionMap[cardType](
    cardConfigurations,
    cardId
  ) as ReturnType<(typeof getCardConfigurationByTypeFunctionMap)[T]>;
};

import { allCards, CardKey } from "../../data/cards";
import Card from "../card/card";
import styles from "./playerHand.module.css";

type Props = {
    cardKeys: CardKey[];
    playerId: number;
    onCardSelect?: (cardId: CardKey, summonable: boolean) => void;
    selectedCardKey?: CardKey | null;
    summonableLevel?: number | null;
};

function PlayerHand({ cardKeys: cardKeys, playerId, selectedCardKey, onCardSelect, summonableLevel }: Props) {
    return (
        <div className={styles.handContainer}>
            {cardKeys.map((key, idx) => {
                const card = {...allCards[key]};
                const isSelected = selectedCardKey === key;
                const summonable = summonableLevel == card.level;
                return (
                    <Card key={`${idx}_${playerId}_${key}`}
                          card={card}
                          isSelected={isSelected}
                          summonable={summonable}
                          onClick={() => {onCardSelect?.(key, summonable)}}
                          summonableLevel={summonableLevel} />
                );
            })}
        </div>
    );
}

export default PlayerHand;
import { allCards, CardId } from "../../data/cards";
import Card from "../card/card";
import styles from "./playerHand.module.css";

type Props = {
    cardIds: CardId[];
    playerId: number;
    onCardSelect?: (cardId: CardId, summonable: boolean) => void;
    selectedCard?: CardId | null;
    summonableLevel?: number | null;
};

function PlayerHand({ cardIds, playerId, selectedCard, onCardSelect, summonableLevel }: Props) {
    return (
        <div className={styles.handContainer}>
            {cardIds.map((cardId, idx) => {
                const card = allCards[cardId];
                const isSelected = selectedCard === cardId;
                const summonable = summonableLevel == card.level;
                return (
                    <Card key={`${idx}_${playerId}_${card.id}`} 
                          card={card}
                          isSelected={isSelected}
                          summonable={summonable}
                          onCardSelect={onCardSelect}
                          summonableLevel={summonableLevel} />
                );
            })}
        </div>
    );
}

export default PlayerHand;
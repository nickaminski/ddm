import { CardId } from "../../data/cards";
import { Monster } from "../../types/monster";
import styles from "./card.module.css";

type Props = {
    card: Monster;
    summonableLevel?: number | null;
    isSelected: boolean;
    summonable: boolean;
    onCardSelect?: (cardId: CardId, summonable: boolean) => void;
};

function Card({ card, summonableLevel, isSelected, summonable, onCardSelect }: Props) {
    return (
        <div className={`${styles.card}
                         ${isSelected ? styles.selected : 
                            card.level == summonableLevel ? styles.summonable : ""}`}
             onClick={() => { onCardSelect?.(card.id as CardId, summonable)}}
            >
            <img src={card.image} alt={card.name} />
            <div className={`${styles.statOverlay} ${styles.level}`}>⭐ {card.level}</div>
            <div className={`${styles.statOverlay} ${styles.health}`}>❤️ {card.health}</div>
            <div className={`${styles.statOverlay} ${styles.attack}`}>⚔️ {card.attack}</div>
            <div className={`${styles.statOverlay} ${styles.defense}`}>🛡️ {card.defense}</div>
        </div>
    );
}

export default Card;
import { MouseEventHandler } from "react";
import { Monster } from "../../types/monster";
import styles from "./card.module.css";

type Props = {
    card: Monster;
    summonableLevel?: number | null;
    isSelected: boolean;
    summonable: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

function Card({ card, summonableLevel, isSelected, onClick }: Props) {
    return (
        <div className={`${styles.card}
                         ${isSelected ? styles.selected : 
                            card.level == summonableLevel ? styles.summonable : ""}`}
             onClick={onClick}
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
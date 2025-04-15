// components/PlayerTurnIndicator.tsx
import styles from "./PlayerTurnIndicator.module.css";

type Props = {
    currentPlayer: 1 | 2;
    canEndTurn: boolean;
    onEndTurn: () => void;
};

function PlayerTurnIndicator({ currentPlayer, canEndTurn, onEndTurn }: Props) {
    return (
        <div className={styles.wrapper}>
            <h2 className={`${styles.turn} ${currentPlayer === 1 ? styles.player1 : styles.player2}`}>
                Player {currentPlayer}'s Turn
            </h2>
            <button className={`${styles.endTurnButton} ${!canEndTurn ? styles.disabledButton : styles.activePulse}`}
                    onClick={onEndTurn}
                    disabled={!canEndTurn}>
                End Turn
            </button>
        </div>
    );
}

export default PlayerTurnIndicator;
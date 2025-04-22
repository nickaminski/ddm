import CrestPool, { CrestPoolModel } from "../crestPool/crestPool";
import styles from "./playerStatus.module.css";

type Props = {
    player: 1 | 2;
    maxHeartPoints: number;
    heartPoints: number;
    crestPool: CrestPoolModel;
};

function PlayerStatus({ player, maxHeartPoints, heartPoints, crestPool }: Props) {
    const health = Array.from({length: heartPoints});
    const missingHealth = Array.from({length: maxHeartPoints - heartPoints});
    return(
        <div className={styles.container}>
            <div className={styles.playerName}>Player {player}</div>
            <div className={styles.healthContainer}>
                {health.map((_, i) => (
                    <div key={i} className={styles.score}>❤️</div>
                ))}
                {missingHealth.map((_, i) => (
                    <div key={i} className={styles.score}>🖤</div>
                ))}
            </div>
            <CrestPool crestCounts={crestPool} iconSize={32} />
        </div>
    );
}

export default PlayerStatus;
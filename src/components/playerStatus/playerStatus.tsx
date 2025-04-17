import CrestPool, { CrestPoolModel } from "../crestPool/crestPool";
import styles from "./playerStatus.module.css";

type Props = {
    player: 1 | 2;
    heartPoints: number;
    crestPool: CrestPoolModel;
};

function PlayerStatus({ player, heartPoints, crestPool }: Props) {
    return(
        <div className={styles.container}>
            <h2>Player {player}</h2>
            <div className={styles.score}>Score: {heartPoints}</div>
            <CrestPool crestCounts={crestPool} iconSize={32} />
        </div>
    );
}

export default PlayerStatus;
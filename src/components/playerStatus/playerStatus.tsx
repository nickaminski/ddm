import { useEffect, useState } from "react";
import CrestPool, { CrestPoolModel } from "../crestPool/crestPool";
import styles from "./playerStatus.module.css";
import PlayerHealth from "../playerHealth/playerHealth";

type Props = {
    player: 1 | 2;
    maxHealth: number;
    currentHealth: number;
    crestPool: CrestPoolModel;
};

function PlayerStatus({ player, maxHealth, currentHealth, crestPool }: Props) {
    

    return(
        <div className={styles.container}>
            <div className={styles.playerName}>Player {player}</div>
            <PlayerHealth currentHealth={currentHealth} maxHealth={maxHealth} />
            <CrestPool crestCounts={crestPool} iconSize={32} />
        </div>
    );
}

export default PlayerStatus;
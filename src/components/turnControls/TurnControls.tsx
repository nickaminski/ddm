import { DieFace } from "../../types/dice";
import { PathType } from "../../types/path";
import DiceRoller from "../diceRoller/DiceRoller";
import PathControls from "../pathControls/PathControls";
import PlayerTurnIndicator from "../playerTurnIndicator/PlayerTurnIndicator";

import styles from "./TurnControls.module.css";

type Props = {
    canSummon: boolean;

    currentPlayer: 1 | 2;
    canEndTurn: boolean;
    onEndTurn: () => void;

    diceRollResults: DieFace[];
    setDiceRollResults: React.Dispatch<React.SetStateAction<DieFace[]>>;
    hasRolled: boolean;
    setHasRolled: (rolled: boolean) => void;
    selectedSet: number;
    onSelectedSet: (val: number) => void;

    selectedPathType: PathType;
    onPathTypeChange: (path: PathType) => void;
    setRotation: React.Dispatch<React.SetStateAction<number>>
};

function TurnControls({ canSummon,
                        currentPlayer, canEndTurn, onEndTurn, 
                        diceRollResults, setDiceRollResults, hasRolled, setHasRolled,
                        selectedSet, onSelectedSet,
                        selectedPathType, onPathTypeChange, setRotation }: Props) {
    return(
        <div className={styles.container}>
            <PlayerTurnIndicator currentPlayer={currentPlayer}
                                 canEndTurn={canEndTurn}
                                 onEndTurn={onEndTurn} />

            <DiceRoller diceRollResults={diceRollResults}
                        setDiceRollResults={setDiceRollResults}
                        hasRolled={hasRolled}
                        setHasRolled={setHasRolled}
                        selectedSet={selectedSet}
                        onSelectedSet={onSelectedSet} />

            {canSummon && <PathControls selectedPathType={selectedPathType}
                                        onPathTypeChange={onPathTypeChange}
                                        setRotation={setRotation}/>
            }
        </div>
    );
}

export default TurnControls;
import { useState } from "react";
import styles from "./DiceRoller.module.css";
import { DICE_SETS, DieFace } from "../../types/dice";
import DieFaceViewer from "../dieFaceViewer/dieFaceViewer";
import DiceHelp from "../diceHelp/diceHelp";
import Drawer from "../drawer/drawer";

type Props = {
    diceRollResults: DieFace[];
    setDiceRollResults: React.Dispatch<React.SetStateAction<DieFace[]>>;
    hasRolled: boolean;
    setHasRolled: (rolled: boolean) => void;
    selectedSet: number;
    onSelectedSet: (val: number) => void;
};

function DiceRoller({ diceRollResults, setDiceRollResults, hasRolled, setHasRolled, selectedSet, onSelectedSet }: Props) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const rollDice = () => {
        if (hasRolled) return;
        
        const set = DICE_SETS[selectedSet];
        const result: DieFace[] = [];

        for (let i = 0; i < 3; i++) {
            const face = set[Math.floor(Math.random() * set.length)];
            result.push(face);
        }

        setHasRolled(true);
        setDiceRollResults(result);
    };

    return (
        <>
            <Drawer isOpen={drawerOpen}>
                <DiceHelp />
            </Drawer>
            <div style={{ marginBottom: "0.5rem" }}>
                <button className={styles.helpButton} onClick={() => setDrawerOpen((prev) => !prev)}>?</button>
                <label htmlFor="dice-level">Dice Level: </label>
                <select
                    id="dice-level"
                    value={selectedSet}
                    className={styles.diceLevelSelect}
                    onChange={(e) => onSelectedSet(Number(e.target.value))}
                    disabled={hasRolled}>
                        {DICE_SETS.map((_, index) => (
                            <option key={index} value={index}>
                                Level {index + 1}
                            </option>
                        ))}
                </select>
            </div>
            <button className={styles.rollButton}
                    onClick={rollDice}
                    disabled={hasRolled}>
                {hasRolled ? "Rolled" : "Roll Dice"}
            </button>
            <div className={styles.diceGrid}>
                {diceRollResults.map((face, idx) => (
                    <DieFaceViewer key={"DR_" + idx} face={face} />
                ))}
            </div>
        </>
    );
};

export default DiceRoller;
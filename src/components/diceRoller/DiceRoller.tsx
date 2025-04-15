// components/DiceRoller.tsx
import { useState } from "react";
import styles from "./DiceRoller.module.css";
import { DICE_SETS, DieFace, SymbolType } from "../../types/dice";
import { SYMBOL_ICONS } from "../../types/crest";
const SYMBOL_COLORS: Record<SymbolType, string> = {
    summon1: "#207520",
    summon2: "#207520",
    summon3: "#207520",
    summon4: "#207520",
    progress: "#004d99",
    attack: "#990000",
    magic: "#5e00a1",
    trap: "#a18200",
    defense: "#333",
};

type Props = {
    diceRollResults: DieFace[];
    setDiceRollResults: React.Dispatch<React.SetStateAction<DieFace[]>>;
    hasRolled: boolean;
    setHasRolled: (rolled: boolean) => void;
};

function DiceRoller({ diceRollResults, setDiceRollResults, hasRolled, setHasRolled }: Props) {
    const [selectedSet, setSelectedSet] = useState(0);  
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
            <div style={{ marginBottom: "0.5rem" }}>
                <label htmlFor="dice-level">Dice Level: </label>
                <select
                    id="dice-level"
                    value={selectedSet}
                    className={styles.diceLevelSelect}
                    onChange={(e) => setSelectedSet(Number(e.target.value))}
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
                    <div key={idx} className={styles.die}>
                        {face.map((symbol, i) => {
                            const Icon = SYMBOL_ICONS[symbol];
                            return (
                                <span key={i} title={symbol} style={{display: "flex"}}>
                                    <Icon width={48} height={48} className="symbol-icon" color={SYMBOL_COLORS[symbol]} />
                                </span>
                            )
                        })}
                    </div>
                ))}
            </div>
        </>
    );
};

export default DiceRoller;
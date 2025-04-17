import DiceLevelViewer from "../diceLevelViewer/diceLevelViewer";
import styles from "./diceHelp.module.css";

type Props = {
    displayLevels?: number[];
};

function DiceHelp({ displayLevels }: Props) {
    const levels = displayLevels ?? [1, 2, 3, 4];

    return(
        <div className={styles.helpContainer}>
            <div>
                {levels.map((level, idx) => (
                    <div key={"DiceHelp_Lvl" + idx} className={styles.helpRow}>
                        <label>Level {level}</label>
                        <DiceLevelViewer level={level} />
                    </div>
                ))}
            </div>
        </div>);
}

export default DiceHelp;
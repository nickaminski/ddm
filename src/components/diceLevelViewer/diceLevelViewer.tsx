import { DICE_SETS } from "../../types/dice";
import DieFaceViewer from "../dieFaceViewer/dieFaceViewer";
import styles from "./diceLevelViewer.module.css";

type Props = {
    level: number;
};

function DiceLevelViewer({ level }: Props) {
    return(
        <div className={styles.diceGrid}>
            {DICE_SETS[level - 1].map((dieFace, index) => (
                <DieFaceViewer face={dieFace} key={"DLV_" + index} size={24} />
            ))}
        </div>);
}

export default DiceLevelViewer;
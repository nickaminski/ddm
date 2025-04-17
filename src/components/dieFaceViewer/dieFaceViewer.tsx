import { SYMBOL_COLORS, SYMBOL_ICONS } from "../../types/crest";
import { DieFace } from "../../types/dice";
import styles from "./dieFaceViewer.module.css";

type Props = {
    face: DieFace;
    size?: number;
};

function DieFaceViewer({face, size}: Props) {
    return (
        <div className={styles.die}>
            {face.map((symbol, i) => {
                const Icon = SYMBOL_ICONS[symbol];
                return (
                    <span key={"DFV_" + i} title={symbol} style={{display: "flex"}}>
                        <Icon width={size ? size : 48} height={size ? size : 48} color={SYMBOL_COLORS[symbol]} />
                    </span>
                )
            })}
        </div>);
}

export default DieFaceViewer;
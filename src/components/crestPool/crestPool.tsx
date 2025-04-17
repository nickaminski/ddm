import { SYMBOL_COLORS, SYMBOL_ICONS } from "../../types/crest";
import { NonSummonSymbolType } from "../../types/dice";
import styles from "./crestPool.module.css";

export type CrestPoolModel = CrestPoolEntry[];

type CrestPoolEntry = {
    type: NonSummonSymbolType;
    count: number;
};

type Props = {
    crestCounts: CrestPoolModel;
    iconSize?: number;
};

function CrestPool({ crestCounts, iconSize }: Props) {
    return(
        <div className={styles.crestPool}>
            {crestCounts.map(({type, count}, i) => {
                const Icon = SYMBOL_ICONS[type];
                return (
                    <div key={type} className={styles.crestRow}>
                        <span key={"DFV_" + i} title={type} style={{display: "flex"}}>
                            <Icon width={iconSize ? iconSize : 48} height={iconSize ? iconSize : 48} color={SYMBOL_COLORS[type]} />
                        </span>
                        <span className={styles.crestCount}>{count}</span>
                    </div>)
            })}
        </div>);
}

export default CrestPool;
import { useEffect, useState } from "react";
import styles from "./playerHealth.module.css";

type Props = {
    currentHealth: number;
    maxHealth: number;
};

function PlayerHealth({currentHealth, maxHealth}: Props) {
    const [prevHealth, setPrevHealth] = useState(currentHealth);
    const [fadingIndex, setFadingIndex] = useState<number | null>(null);

    useEffect(() => {
        if (currentHealth < prevHealth) {
            const lostIndex = currentHealth;
            setFadingIndex(lostIndex);

            const timer = setTimeout(() => {
                setPrevHealth(currentHealth);
                setFadingIndex(null);
            }, 1000); // this time should match the transition: opacity 1s ease time in the css
            return () => clearTimeout(timer);
        }

        if (currentHealth > prevHealth) {
            setPrevHealth(currentHealth);
        }
    }, [currentHealth, prevHealth]);
    
    return (
        <div className={styles.playerHealth}>
            {Array.from({length: maxHealth}).map((_, i) => {
                const isFilled = i < prevHealth;
                const isFading = i === fadingIndex;
                
                return (
                    <span key={i}
                          className={styles.heartSlot}>
                        <span className={`${styles.black}`}>🖤</span>
                        {(isFilled || isFading) && (
                            <span className={`${styles.red} ${isFading ? styles.fadeOut : ""}`}>❤️</span>
                        )}
                    </span>
                )}
            )}
        </div>
    );
}

export default PlayerHealth;
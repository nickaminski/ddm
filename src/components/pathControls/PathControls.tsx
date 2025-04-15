import { PATH_SHAPES, PathType } from "../../types/path";
import styles from "./PathControls.module.css";

import CrossIcon from "../../assets/icons/paths/Cross.png";
import ZIcon from "../../assets/icons/paths/Z.png";
import TIcon from "../../assets/icons/paths/T.png";
import HookIcon from "../../assets/icons/paths/Hook.png";
import ZagIcon from "../../assets/icons/paths/Zag.png";
import { useEffect } from "react";

const pathIcons: Record<PathType, string> = {
    Cross: CrossIcon,
    Z: ZIcon,
    T: TIcon,
    Hook: HookIcon,
    Zag: ZagIcon,
  };

type Props = {
    selectedPathType: PathType;
    onPathTypeChange: (path: PathType) => void;
    setRotation: React.Dispatch<React.SetStateAction<number>>
};

function PathControls({ selectedPathType, onPathTypeChange, setRotation }: Props) {

    const handleRotate = () => {
        setRotation((prev) => (prev + 1) % 4);
    }

    // Add keyboard shortcut for rotate
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "r" || e.key === "R") {
                e.preventDefault(); // prevent browser refresh or other effects
                handleRotate();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className={styles.controls}>
          <div className={styles.switchGroup}>
            {Object.keys(PATH_SHAPES).map((path) => {
              const pathKey = path as PathType;
              return (
                <button
                  key={path}
                  className={`${styles.switchButton} ${
                    selectedPathType === pathKey ? styles.active : ""
                  }`}
                  onClick={() => onPathTypeChange(pathKey)}
                  title={pathKey}
                >
                    <img src={pathIcons[pathKey]}
                         alt={pathKey}
                         className={styles.icon}
                    />
                </button>
              );
            })}
            <div className={styles.rotateButtonWrapper}>
                <button className={styles.rotateButton}
                        onClick={handleRotate}
                        title="Rotate">
                    ⤾
                </button>
                <span className={styles.hotkeyBadge}>R</span>
            </div>
          </div>
        </div>
      );
}

export default PathControls;
import { ReactNode } from "react";
import styles from "./drawer.module.css";

type Props = {
    isOpen: boolean;
    children: ReactNode;
}

function Drawer({ isOpen, children }: Props) {
    return(
        <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
            {children}
        </div>
    );
};

export default Drawer;
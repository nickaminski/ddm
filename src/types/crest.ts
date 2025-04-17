import Summon1Icon  from "../assets/icons/crests/summon1.svg?react";
import Summon2Icon from "../assets/icons/crests/summon2.svg?react";
import Summon3Icon from "../assets/icons/crests/summon3.svg?react";
import Summon4Icon from "../assets/icons/crests/summon4.svg?react";
import AttackIcon from "../assets/icons/crests/attackCrest.svg?react";
import DefenseIcon from "../assets/icons/crests/defenseCrest.svg?react";
import ProgressIcon from "../assets/icons/crests/progressCrest.svg?react";
import TrapIcon from "../assets/icons/crests/trapCrest.svg?react";
import MagicIcon from "../assets/icons/crests/magicCrest.svg?react";
import { SymbolType } from "./dice";

export const SYMBOL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    summon1: Summon1Icon,
    summon2: Summon2Icon,
    summon3: Summon3Icon,
    summon4: Summon4Icon,
    attack: AttackIcon,
    defense: DefenseIcon,
    progress: ProgressIcon,
    trap: TrapIcon,
    magic: MagicIcon,
};

export const SYMBOL_COLORS: Record<SymbolType, string> = {
    summon1: "#207520",
    summon2: "#207520",
    summon3: "#207520",
    summon4: "#207520",
    progress: "#004d99",
    attack: "#990000",
    magic: "#5e00a1",
    trap: "#c6c600",
    defense: "#333",
};
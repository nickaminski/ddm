import { Monster } from "./monster";

export type Cell = {
    player: number | null;     // Who placed the cell here
    monster?: Monster;
};
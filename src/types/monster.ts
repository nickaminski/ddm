import { Position } from "./position";

export type Monster = {
    id?: number;
    player?: number;             // Who owns the monster
    name: string;
    level: number;
    tribe: string;
    attack: number;
    defense: number;
    health: number;
    image: string;
    icon: string;
    position?: Position;
    flying: boolean;
}
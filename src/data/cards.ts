import { Monster } from "../types/monster";
import { monsterAssets } from "./monsterAssets";

export type CardId = keyof typeof allCards;

export const allCards = {
    darkMagicianGirl:{
        id: "darkMagicianGirl",
        name: "Dark Magician Girl",
        level: 2,
        tribe: "Dark",
        health: 20,
        attack: 20,
        defense: 20,
        image: monsterAssets.dmg.cardImage,
        icon: monsterAssets.dmg.icon
    },
    blueEyesWhiteDragon: {
        id: "blueEyesWhiteDragon",
        name: "Bue-Eyes White Dragon",
        level: 2,
        tribe: "Dragon",
        health: 50,
        attack: 40,
        defense: 30,
        image: monsterAssets.blueeyes.cardImage,
        icon: monsterAssets.blueeyes.icon
    },
    darkMagician: {
        id: "darkMagician",
        name: "Dark Magician",
        level: 2,
        tribe: "Dark",
        health: 30,
        attack: 40,
        defense: 20,
        image: monsterAssets.darkmagician.cardImage,
        icon: monsterAssets.darkmagician.icon
    }
} satisfies Record<string, Monster>;
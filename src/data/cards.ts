import { Monster } from "../types/monster";
import { monsterAssets } from "./monsterAssets";

export type CardKey = keyof typeof allCards;

export const allCards = {
    blueEyesWhiteDragon: {
        name: "Bue-Eyes White Dragon",
        level: 4,
        tribe: "Dragon",
        health: 50,
        attack: 40,
        defense: 30,
        image: monsterAssets.blueeyes.cardImage,
        icon: monsterAssets.blueeyes.icon
    },
    darkAssailant: {
        name: "Dark Assailant",
        level: 3,
        tribe: "Invincible",
        health: 20,
        attack: 10,
        defense: 20,
        image: monsterAssets.darkassailant.cardImage,
        icon: monsterAssets.darkassailant.icon
    },
    lordOfD: {
        name: "Lord of D.",
        level: 2,
        tribe: "Dark",
        health: 10,
        attack: 10,
        defense: 10,
        image: monsterAssets.lordofd.cardImage,
        icon: monsterAssets.lordofd.icon
    },
    vorseRaider: {
        name: "Vorse Raider",
        level: 1,
        tribe: "Warrior",
        health: 10,
        attack: 20,
        defense: 10,
        image: monsterAssets.vorseraider.cardImage,
        icon: monsterAssets.vorseraider.icon
    },
    mysticalElf: {
        name: "Mystical Elf",
        level: 1,
        tribe: "Dark",
        health: 20,
        attack: 10,
        defense: 20,
        image: monsterAssets.mysticalelf.cardImage,
        icon: monsterAssets.mysticalelf.icon
    },
    wingedDragonGuardian: {
        name: "Winged Dragon, Guardian of the Fortress #1",
        level: 2,
        tribe: "Dragon",
        health: 10,
        attack: 10,
        defense: 10,
        image: monsterAssets.wingeddragonguardian.cardImage,
        icon: monsterAssets.wingeddragonguardian.icon
    },
    curseOfDragon: {
        name: "Curse of Dragon",
        level: 3,
        tribe: "Dragon",
        health: 20,
        attack: 20,
        defense: 20,
        image: monsterAssets.curseofdragon.cardImage,
        icon: monsterAssets.curseofdragon.icon
    },
    darkMagician: {
        name: "Dark Magician",
        level: 4,
        tribe: "Dark",
        health: 30,
        attack: 40,
        defense: 20,
        image: monsterAssets.darkmagician.cardImage,
        icon: monsterAssets.darkmagician.icon
    },

} satisfies Record<string, Monster>;
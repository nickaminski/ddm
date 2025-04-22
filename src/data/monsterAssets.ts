const cardImages = import.meta.glob("../assets/monsters/cards/*.png", { eager: true });
const monsterIcons = import.meta.glob("../assets/monsters/icons/*.png", { eager: true });

export const monsterAssets = Object.fromEntries(
    Object.entries(cardImages).map(([path, mod]) => {
        const fileName = path.split("/").pop()!.replace(".png", "");
        return [fileName, {
            cardImage: (mod as { default: string }).default,
            icon: (monsterIcons[`../assets/monsters/icons/${fileName}.png`] as { default: string })?.default
        }]
    })
);
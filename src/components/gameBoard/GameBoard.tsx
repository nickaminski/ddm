import { JSX, useState } from "react";
import styles from "./GameBoard.module.css";
import { PATH_SHAPES, PathShape, PathType } from "../../types/path";
import { Cell } from "../../types/cell";
import { Monster } from "../../types/monster";

type Position = [number, number];

type Props = {
    grid: Cell[][];
    currentPlayer: 1 | 2;
    hasPlacedTile: boolean;
    rotation: number;
    selectedPath: PathType;
    monsterAvailableToSummon: boolean;
    cardSelected: boolean;
    selectedMonster: Monster | null;
    onClickTile: (row: number, col: number) => void;
    isPlacementLegal: (row: number, col: number) => boolean;
    diceRollAllowsSummon: () => boolean;
};

function GameBoard({grid, hasPlacedTile, monsterAvailableToSummon, currentPlayer, cardSelected, selectedMonster, onClickTile, isPlacementLegal, diceRollAllowsSummon, rotation, selectedPath } : Props) {
    const [hoverCoords, setHoverCoords] = useState<[number, number] | null>(null);

    const rotatePathShape = (shape: PathShape): PathShape => shape.map(([r, c]) => [c, -r]);

    const getRotatedPathShape = (): PathShape => {
        let shape = PATH_SHAPES[selectedPath];
        for (let i = 0; i < rotation; i++) {
            shape = rotatePathShape(shape);
        }
        return shape;
    };

    const handleMouseEnter = (row: number, col: number) => {
        setHoverCoords([row, col]);
    };

    const handleMouseLeave = () => {
        setHoverCoords(null);
    };

    const findMonsterPosition = (monster: Monster): Position | null  =>  {
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                const found = grid[r][c].monster;
                if (found && found.id == monster.id) {
                    return [r, c];
                }
            }
        }
        return null;
    };

    const getValidMovementTargets = ([r, c]: Position): Position[] | null  =>  {
        const directions: Position[] = [
            [-1, 0], // up
            [1, 0],  // down
            [0, -1], // left
            [0, 1],  // right
        ];

        return directions.map(([dr, dc]) => [r + dr, c + dc] as Position)
                         .filter(([nr, nc]) => nr >= 0 &&
                                               nr <= grid.length &&
                                               nc >= 0 &&
                                               nc < grid[0].length &&
                                               grid[nr][nc].player === currentPlayer &&
                                               !grid[nr][nc].monster);
    };

    const renderCell = (r: number, c: number): JSX.Element => {
        const cell = grid[r][c];
        let cellClass = styles.cell;

        if (grid[r][c].player) {
            cellClass +=
            grid[r][c]?.player === 1 ? ` ${styles.player1}` : ` ${styles.player2}`;
        }

        if (hoverCoords && diceRollAllowsSummon() && !hasPlacedTile && monsterAvailableToSummon && cardSelected) {
            const [hr, hc] = hoverCoords;
            const shape = getRotatedPathShape();
            const isLegal = isPlacementLegal(hr, hc);

            for (const [dr, dc] of shape) {
                if (hr + dr === r && hc + dc === c) {
                    cellClass += ` ${isLegal ? styles.preview : styles.invalid}`;
                }
            }
        }

        if (selectedMonster) {
            const from = findMonsterPosition(selectedMonster);
            if (from && from[0] === r && from[1] === c) {
                cellClass += ` ${styles.selectedMonster}`;
            }

            if (from) {
                const validTargets = getValidMovementTargets(from);
                if (validTargets?.some(([vr, vc]) => vr === r && vc === c)) {
                    cellClass += ` ${styles.movable}`;
                }
            }
        }

        return (
            <div
                key={`${r}-${c}`}
                className={cellClass}
                onClick={() => onClickTile(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
                onMouseLeave={handleMouseLeave}
            >
                {cell.monster && (
                    <img
                        src={cell.monster.icon}
                        alt={cell.monster.name}
                        className={styles.monsterIcon}
                    />
                )}
            </div>
        );
    };

    return (
        <div>
            <div className={styles.board}>
                {grid.map((row, rIdx) =>
                    row.map((_, cIdx) => renderCell(rIdx, cIdx))
                )}
            </div>
        </div>
    );
};

export default GameBoard;
import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/gameBoard/GameBoard';
import { DieFace, NonSummonSymbolType } from './types/dice';
import { PATH_SHAPES, PathShape, PathType } from './types/path';
import TurnControls from './components/turnControls/TurnControls';
import { Cell } from './types/cell';
import { CrestPoolModel } from './components/crestPool/crestPool';
import PlayerStatus from './components/playerStatus/playerStatus';
import PlayerHand from './components/playerHand/playerHand';
import { allCards, CardKey } from './data/cards';
import { Position } from './types/position';

function App() {
    const ROWS = 13;
    const COLS = 19;
    const MAX_HEART_POINTS = 3;
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [hasRolled, setHasRolled] = useState(false);
    const [canSummon, setCanSummon] = useState(false);
    const [diceRollResults, setDiceRollResults] = useState<DieFace[]>([]);
    const [hasPlacedTile, setHasPlacedTile] = useState(false);
    const [canEndTurn, setCanEndTurn] = useState(false);
    const [monsterAvailableToSummon, setMonsterAvailableToSummon] = useState(false);
    const [selectedMonsterPosition, setSelectedMonsterPosition] = useState<Position | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [selectedPathType, setSelectedPathType] = useState<PathType>("Cross");
    const [selectedCard, setSelectedCard] = useState<CardKey | null>(null);
    const [summonableLevel, setSummonableLevel] = useState<number | null>(null);

    const [player1CrestPool, setPlayer1CrestPool] = useState<CrestPoolModel>([
        { type: "progress", count: 0 },
        { type: "attack", count: 0 },
        { type: "defense", count: 0 },
        { type: "magic", count: 0 },
        { type: "trap", count: 0 }
    ]);
    const [player1Hand, setPlayer1Hand] = useState<CardKey[]>(["darkMagician","curseOfDragon", "wingedDragonGuardian", "mysticalElf"]);
    const [player1Health, setPlayer1Health] = useState<number>(MAX_HEART_POINTS);
    const [player2CrestPool, setPlayer2CrestPool] = useState<CrestPoolModel>([
        { type: "progress", count: 0 },
        { type: "attack", count: 0 },
        { type: "defense", count: 0 },
        { type: "magic", count: 0 },
        { type: "trap", count: 0 }
    ]);
    const [player2Hand, setPlayer2Hand] = useState<CardKey[]>(["blueEyesWhiteDragon", "darkAssailant", "lordOfD", "vorseRaider"]);
    const [selectedSet, setSelectedSet] = useState<number>(0);
    const [player2Health, setPlayer2Health] = useState<number>(MAX_HEART_POINTS);

    const createEmptyCell = (): Cell => ({
        player: null,
        monster: undefined,
    });

    const [grid, setGrid] = useState<Cell[][]>(() => {
        const initialGrid: Cell[][] = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => createEmptyCell())
        );
        initialGrid[Math.floor(ROWS / 2)][0] = {player: 1};
        initialGrid[Math.floor(ROWS / 2)][COLS - 1] = {player: 2};    
        return initialGrid;
    });

    const endTurn = () => {
        if (!canEndTurn) return;

        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        setHasRolled(false);
        setDiceRollResults([]);
        setHasPlacedTile(false);
        setCanSummon(false);
        setSummonableLevel(null);
        setMonsterAvailableToSummon(false);
        setSelectedMonsterPosition(null);
    }

    useEffect(() => {
        if (!hasRolled) {
            setCanEndTurn(false);
            return;
        } 

        const summonCrests = diceRollResults.flat().filter((symbol) => symbol.startsWith("summon")).sort();

        var localMonsterAvailable = false;
        if (currentPlayer == 1) {
            localMonsterAvailable = player1Hand.filter(x => allCards[x].level-1 == selectedSet).length > 0;
            setMonsterAvailableToSummon(localMonsterAvailable);
        }
        if (currentPlayer == 2) {
            localMonsterAvailable = player2Hand.filter(x => allCards[x].level-1 == selectedSet).length > 0;
            setMonsterAvailableToSummon(localMonsterAvailable);
        }

        // we rolled to summon, we have not placed the summon, and we have a monster in hand the same level of dice used
        if (summonCrests.length >= 2 && !hasPlacedTile && localMonsterAvailable) {
            setCanSummon(true);
            setCanEndTurn(false);
            const summonLevel = parseInt(summonCrests[0].charAt(summonCrests[0].length-1));
            setSummonableLevel(summonLevel);
            return;
        }

        setCanSummon(false);
        setCanEndTurn(true);
    }, [hasRolled, hasPlacedTile]);

    useEffect(() => {
        const allSymbols = diceRollResults.flat();
        const counts = allSymbols.reduce<Record<NonSummonSymbolType, number>>((acc, sym) => {
            if (!sym.startsWith("summon")) {
                acc[sym as NonSummonSymbolType]++;
            }
            return acc;
        }, {
            progress: 0,
            attack: 0,
            defense: 0,
            magic: 0,
            trap: 0
        });

        if (currentPlayer === 1) {
            setPlayer1CrestPool((prev) => {
                var newCrestPool: CrestPoolModel = [];
                newCrestPool.push({ type: "progress", count: prev.find(x => x.type == "progress")!.count + counts.progress});
                newCrestPool.push({ type: "attack", count: prev.find(x => x.type == "attack")!.count + counts.attack});
                newCrestPool.push({ type: "defense", count: prev.find(x => x.type == "defense")!.count + counts.defense});
                newCrestPool.push({ type: "magic", count: prev.find(x => x.type == "magic")!.count + counts.magic});
                newCrestPool.push({ type: "trap", count: prev.find(x => x.type == "trap")!.count + counts.trap});
                return newCrestPool;
            });
        } else if (currentPlayer === 2) {
            setPlayer2CrestPool((prev) => {
                var newCrestPool: CrestPoolModel = [];
                newCrestPool.push({ type: "progress", count: prev.find(x => x.type == "progress")!.count + counts.progress});
                newCrestPool.push({ type: "attack", count: prev.find(x => x.type == "attack")!.count + counts.attack});
                newCrestPool.push({ type: "defense", count: prev.find(x => x.type == "defense")!.count + counts.defense});
                newCrestPool.push({ type: "magic", count: prev.find(x => x.type == "magic")!.count + counts.magic});
                newCrestPool.push({ type: "trap", count: prev.find(x => x.type == "trap")!.count + counts.trap});
                return newCrestPool;
            });
        }

    }, [diceRollResults]);

    const onSetPathType = (newType: PathType) => {
        setSelectedPathType(newType);
    }

    const diceRollAllowsSummon = (): boolean => {
        const allSymbols = diceRollResults.flat();
        const summonCount = allSymbols.filter(sym => sym.startsWith("summon")).length;
        return summonCount >= 2;
    };

    const handleClickTile = (row: number, col: number) => {
        if (!hasPlacedTile && diceRollAllowsSummon() && isPlacementLegal(row, col)) {
            handlePlaceTile(row, col);
        } else if (selectedMonsterPosition && canMoveSelectedMonsterTo(row, col)) {
            handleMoveSelectedMonster(row, col);
        } else if (canEndTurn) {
            handleSelectMonsterOnBoard(row, col);
        }
    };

    const handleMoveSelectedMonster = (targetRow: number, targetCol: number) => {
        if (!selectedMonsterPosition) return;

        const prevPos = selectedMonsterPosition;
        const monster = grid[prevPos[0]][prevPos[1]].monster;

        if (currentPlayer === 1 && !canSpendCrests(player1CrestPool, "progress", monster?.flying ? 2 : 1)) {
            return
        } else if (currentPlayer === 2 && !canSpendCrests(player2CrestPool, "progress", monster?.flying ? 2 : 1)) {
            return;
        }

        
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
            
            monster!.position = [targetRow, targetCol];
            
            newGrid[prevPos[0]][prevPos[1]].monster = undefined;
            newGrid[targetRow][targetCol].monster = monster;

            return newGrid;
        });

        if (currentPlayer === 1) {
            setPlayer1CrestPool(prev => spendCrests(prev, "progress", monster?.flying ? 2 : 1));
        } else if (currentPlayer === 2) {
            setPlayer2CrestPool(prev => spendCrests(prev, "progress",  monster?.flying ? 2 : 1));
        }
        
        setSelectedMonsterPosition([targetRow, targetCol]);
    };

    const spendCrests = (crestPool: CrestPoolModel, type: NonSummonSymbolType, amount: number): CrestPoolModel => {
        return crestPool.map(entry =>
            entry.type === type && entry.count >= amount 
                ? { ...entry, count: entry.count - amount }
                : entry
        );
    }

    const canSpendCrests = (crestPool: CrestPoolModel, type: NonSummonSymbolType, amount: number = 1): boolean => {
        const entry = crestPool.find(e => e.type === type);
        return !!entry && entry.count >= amount;
    };

    const canMoveSelectedMonsterTo = (row: number, col: number): boolean => {
        if (!selectedMonsterPosition) return false;
        const validTargets= getValidMovementTargets(selectedMonsterPosition);
        if (validTargets?.some(([vr, vc]) => vr === row && vc === col)) {
            return true;
        }
        return false;
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
                                               !!grid[nr][nc].player &&
                                               !grid[nr][nc].monster);
    };

    const isPlacementLegal = (row: number, col: number): boolean => {
        const shape = getRotatedPathShape();
        let connectsToOwnPath = false;

        for (const [dr, dc] of shape) {
            const r = row + dr;
            const c = col + dc;

            // Out of bounds
            if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
                return false;
            }

            // Overlapping
            if (grid[r][c].player !== null) return false;

            // Check neighbors for own path
            const neighbors = [
                [r - 1, c],
                [r + 1, c],
                [r, c - 1],
                [r, c + 1],
            ];

            for (const [nr, nc] of neighbors) {
                if (
                    nr >= 0 &&
                    nr < grid.length &&
                    nc >= 0 &&
                    nc < grid[0].length &&
                    grid[nr][nc]?.player === currentPlayer
                ) {
                    connectsToOwnPath = true;
                }
            }
        }
        return connectsToOwnPath;
    };

    const handlePlaceTile = (row: number, col: number) => {
        if (!selectedCard) return;

        const shape = getRotatedPathShape();
        const newGrid = grid.map((r) => [...r]);

        for (const [dr, dc] of shape) {
            const r = row + dr;
            const c = col + dc;
            if (dr == 0 && dc == 0) {
                newGrid[r][c] = { player: currentPlayer, monster: { player: currentPlayer, 
                                                                    id: Math.random() * 100000000000,
                                                                    position: [r, c],
                                                                    ...allCards[selectedCard] } };
            } else {
                newGrid[r][c] = { player: currentPlayer };
            }
        }

        setGrid(newGrid);
        setHasPlacedTile(true);
        setSelectedCard(null);
        setSummonableLevel(null);
        setMonsterAvailableToSummon(false);
    };

    const handleSelectMonsterOnBoard = (row: number, col: number) => {
        if (grid[row][col].monster?.player == currentPlayer)
            setSelectedMonsterPosition([row, col]);
        else
            setSelectedMonsterPosition(null);
    };

    const handleCardSelect = (cardId: CardKey, summonable: boolean) => {
        if (canSummon && summonable)
            setSelectedCard(cardId);
        if (!hasRolled) {
            setSelectedSet(allCards[cardId].level-1);
        }
    }

    const rotatePathShape = (shape: PathShape): PathShape => shape.map(([r, c]) => [c, -r]);
    
    const getRotatedPathShape = (): PathShape => {
        let shape = PATH_SHAPES[selectedPathType];
        for (let i = 0; i < rotation; i++) {
            shape = rotatePathShape(shape);
        }
        return shape;
    };

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginRight: '1rem' }}>
                    <PlayerStatus player={1} maxHealth={MAX_HEART_POINTS} currentHealth={player1Health} crestPool={player1CrestPool} />
                </div>
                <GameBoard grid={grid}
                           hasPlacedTile={hasPlacedTile}
                           rotation={rotation}
                           selectedPath={selectedPathType}
                           monsterAvailableToSummon={monsterAvailableToSummon}
                           cardSelected={selectedCard != null}
                           selectedMonsterPosition={selectedMonsterPosition}
                           onClickTile={handleClickTile}
                           isPlacementLegal={isPlacementLegal}
                           diceRollAllowsSummon={diceRollAllowsSummon}
                           canMoveSelectedMonsterTo={canMoveSelectedMonsterTo} />
                <div style={{ marginLeft: '1rem' }}>
                    <PlayerStatus player={2} maxHealth={MAX_HEART_POINTS} currentHealth={player2Health} crestPool={player2CrestPool} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ marginRight: '1rem' }}>
                    <PlayerHand playerId={1} 
                                cardKeys={player1Hand}
                                onCardSelect={handleCardSelect}
                                selectedCardKey={selectedCard}
                                summonableLevel={summonableLevel}/>
                </div>

                <TurnControls canSummon={canSummon}
                            currentPlayer={currentPlayer}
                            canEndTurn={canEndTurn}
                            onEndTurn={endTurn}
                            hasRolled={hasRolled}
                            setHasRolled={setHasRolled}
                            diceRollResults={diceRollResults}
                            setDiceRollResults={setDiceRollResults}
                            selectedSet={selectedSet}
                            onSelectedSet={setSelectedSet}
                            setRotation={setRotation}
                            onPathTypeChange={onSetPathType}
                            selectedPathType={selectedPathType} />

                <div style={{marginLeft: '1rem' }}>
                    <PlayerHand playerId={2} 
                                cardKeys={player2Hand}/>
                </div>
            </div>
        </div>
      );
}

export default App

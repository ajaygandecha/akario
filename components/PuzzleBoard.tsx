import { Puzzle } from "@prisma/client";
import { useEffect, useState } from "react";
import GameModel from "../modules/GameModel";
import UserDataManager from "../modules/UserData";
import Tile, { TileType } from "./Tile";

export default function PuzzleBoard(props: {puzzle: Puzzle}) {

    const [gameModel, setGameModel] = useState<GameModel | null>();

    useEffect(() => {
        setGameModel(new GameModel(props.puzzle, UserDataManager.getDataForPuzzle(props.puzzle.id)));
    }, []);

    function handleTilePress(r: number, c: number) {
        
        if(gameModel != null) {
            let newModel = Object.assign(new GameModel(props.puzzle), gameModel);

            // First, handle adding and removing lamps
            if (gameModel.activePuzzle.getTileType(r, c) == TileType.cooridor) {
                if (gameModel.isLamp(r, c) == false) {
    
                    newModel.addLamp(r, c);
                    setGameModel((_) => newModel);
                } else {
    
                    gameModel.removeLamp(r, c);       
                    setGameModel((_) => newModel);
                }
    
            }
    
            setGameModel((_) => newModel);
    
            UserDataManager.setDataForPuzzle(props.puzzle.id, newModel.lampList);
        }
    }

    let gridTemplateColumnsStyle = "";

    if(gameModel != null) {
        gridTemplateColumnsStyle = "repeat(" + gameModel.activePuzzle.getWidth().toString() + ", minmax(0, 1fr))";
    }

    return(
        <>
        { (gameModel != null) ? (
            <div className="bg-slate-400 p-2 sm:w-7/12 md:w-5/12 lg:w-3/12">  
                <div className={"grid gap-2"} style={{gridTemplateColumns : gridTemplateColumnsStyle}}>
                    {(()=>{
                        const tileArray = [];
                        for(let r = 0; r < gameModel.activePuzzle.getHeight(); r++) {
                            for(let c = 0; c < gameModel.activePuzzle.getWidth(); c++) {
                                tileArray.push(
                                    <Tile key={r.toString() + c.toString()} model={gameModel} r={r} c={c} action={() => handleTilePress(r,c)}/>
                                );
                            }
                        }
                        return tileArray;
                    })()}
                </div>
            </div>
            ) : (<p>Loading...</p>) 
        }
        </>
        
    );
}

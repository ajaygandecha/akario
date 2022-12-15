import { useState } from "react";
import Tile, { ClueStyleTile, CooridorStyleTile, InvalidLampStyleTile, LampStyleTile, LitStyleTile, SatisfiedClueStyleTile, TileType, WallStyleTile } from "../../components/Tile";
import { useRouter } from "next/router";
import GameModel, { TileStyleType } from "../../modules/GameModel";
import PuzzleBoard from "../../components/PuzzleBoard";

export default function PuzzleView() {

    const router = useRouter();
    const { id } = router.query;
    
    // const [gameModel, setGameModel] = useState(new GameModel());

    // function handleTilePress(r: number, c: number) {
        
    //     let newModel = Object.assign(new GameModel(), gameModel);

    //     // First, handle adding and removing lamps
    //     if (gameModel.activePuzzle.getTileType(r, c) == TileType.cooridor) {
    //         if (gameModel.isLamp(r, c) == false) {

    //             console.log("Adding lamp");

    //             newModel.addLamp(r, c);
                
    //             setGameModel((previous) => newModel);

    //         } else {

    //             console.log("Removing lamp");

    //             gameModel.removeLamp(r, c);       
            
    //             setGameModel((previous) => newModel);
    //         }

    //     }

    //     console.log(gameModel);

    //     setGameModel((previous) => newModel);

    //     //console.log(new Coordinate(r, c).getCoordinatesInViewForPuzzle(gameModel.activePuzzle));
    //     //test
    // }
    
    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">

            {/* Header */}
            <header className="">
                <h1 className="text-center font-mono font-bold text-2xl pt-8">
                    Puzzle #{id}
                </h1>
            </header>

            {/* Main content */}
            <main>
                <div className="flex items-center justify-center mt-8">
                    {/* Puzzle Container */}
                    <PuzzleBoard/>
                        {/* {
                            (gameModel.isSolved()) ? <p>Solved</p> : (
                                <div className="bg-slate-400 p-2 sm:w-7/12 md:w-5/12 lg:w-3/12 aspect-square">
                                    <div className={"grid gap-2 grid-cols-" + "7"}>
                                        <Tile model={gameModel} r={0} c={0} action={() => handleTilePress(0,0)}/>
                                        <Tile model={gameModel} r={0} c={1} action={() => handleTilePress(0,1)}/>
                                        <Tile model={gameModel} r={0} c={2} action={() => handleTilePress(0,2)}/>
                                        <Tile model={gameModel} r={0} c={3} action={() => handleTilePress(0,3)}/>
                                        <Tile model={gameModel} r={0} c={4} action={() => handleTilePress(0,4)}/>
                                        <Tile model={gameModel} r={0} c={5} action={() => handleTilePress(0,5)}/>
                                        <Tile model={gameModel} r={0} c={6} action={() => handleTilePress(0,6)}/>

                                        <Tile model={gameModel} r={1} c={0} action={() => handleTilePress(1,0)}/>
                                        <Tile model={gameModel} r={1} c={1} action={() => handleTilePress(1,1)}/>
                                        <Tile model={gameModel} r={1} c={2} action={() => handleTilePress(1,2)}/>
                                        <Tile model={gameModel} r={1} c={3} action={() => handleTilePress(1,3)}/>
                                        <Tile model={gameModel} r={1} c={4} action={() => handleTilePress(1,4)}/>
                                        <Tile model={gameModel} r={1} c={5} action={() => handleTilePress(1,5)}/>
                                        <Tile model={gameModel} r={1} c={6} action={() => handleTilePress(1,6)}/>

                                        <Tile model={gameModel} r={2} c={0} action={() => handleTilePress(2,0)}/>
                                        <Tile model={gameModel} r={2} c={1} action={() => handleTilePress(2,1)}/>
                                        <Tile model={gameModel} r={2} c={2} action={() => handleTilePress(2,2)}/>
                                        <Tile model={gameModel} r={2} c={3} action={() => handleTilePress(2,3)}/>
                                        <Tile model={gameModel} r={2} c={4} action={() => handleTilePress(2,4)}/>
                                        <Tile model={gameModel} r={2} c={5} action={() => handleTilePress(2,5)}/>
                                        <Tile model={gameModel} r={2} c={6} action={() => handleTilePress(2,6)}/>

                                        <Tile model={gameModel} r={3} c={0} action={() => handleTilePress(3,0)}/>
                                        <Tile model={gameModel} r={3} c={1} action={() => handleTilePress(3,1)}/>
                                        <Tile model={gameModel} r={3} c={2} action={() => handleTilePress(3,2)}/>
                                        <Tile model={gameModel} r={3} c={3} action={() => handleTilePress(3,3)}/>
                                        <Tile model={gameModel} r={3} c={4} action={() => handleTilePress(3,4)}/>
                                        <Tile model={gameModel} r={3} c={5} action={() => handleTilePress(3,5)}/>
                                        <Tile model={gameModel} r={3} c={6} action={() => handleTilePress(3,6)}/>

                                        <Tile model={gameModel} r={4} c={0} action={() => handleTilePress(4,0)}/>
                                        <Tile model={gameModel} r={4} c={1} action={() => handleTilePress(4,1)}/>
                                        <Tile model={gameModel} r={4} c={2} action={() => handleTilePress(4,2)}/>
                                        <Tile model={gameModel} r={4} c={3} action={() => handleTilePress(4,3)}/>
                                        <Tile model={gameModel} r={4} c={4} action={() => handleTilePress(4,4)}/>
                                        <Tile model={gameModel} r={4} c={5} action={() => handleTilePress(4,5)}/>
                                        <Tile model={gameModel} r={4} c={6} action={() => handleTilePress(4,6)}/>

                                        <Tile model={gameModel} r={5} c={0} action={() => handleTilePress(5,0)}/>
                                        <Tile model={gameModel} r={5} c={1} action={() => handleTilePress(5,1)}/>
                                        <Tile model={gameModel} r={5} c={2} action={() => handleTilePress(5,2)}/>
                                        <Tile model={gameModel} r={5} c={3} action={() => handleTilePress(5,3)}/>
                                        <Tile model={gameModel} r={5} c={4} action={() => handleTilePress(5,4)}/>
                                        <Tile model={gameModel} r={5} c={5} action={() => handleTilePress(5,5)}/>
                                        <Tile model={gameModel} r={5} c={6} action={() => handleTilePress(5,6)}/>

                                        <Tile model={gameModel} r={6} c={0} action={() => handleTilePress(6,0)}/>
                                        <Tile model={gameModel} r={6} c={1} action={() => handleTilePress(6,1)}/>
                                        <Tile model={gameModel} r={6} c={2} action={() => handleTilePress(6,2)}/>
                                        <Tile model={gameModel} r={6} c={3} action={() => handleTilePress(6,3)}/>
                                        <Tile model={gameModel} r={6} c={4} action={() => handleTilePress(6,4)}/>
                                        <Tile model={gameModel} r={6} c={5} action={() => handleTilePress(6,5)}/>
                                        <Tile model={gameModel} r={6} c={6} action={() => handleTilePress(6,6)}/>
                                    </div>
                                </div>
                            )
                        } */}
                </div>
            </main>

            {/* Footer */}
            <footer className="">
                <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
            </footer>
        </div>
    )
}
import { Puzzle } from "@prisma/client";
import { useEffect, useState } from "react";
import GameModel from "../modules/GameModel";
import UserDataManager from "../modules/UserData";
import Tile, { TileType } from "./Tile";

/**
 * Component for the Puzzle board.
 * @param - Puzzle to show.
 * @returns the render for the puzzle board.
 */
export default function PuzzleBoard(props: { puzzle: Puzzle }) {

    // State variables for the game model.
    const [gameModel, setGameModel] = useState<GameModel | null>();

    // Create the game model based on the user data stored in `localStorage`.
    useEffect(() => {
        setGameModel(new GameModel(props.puzzle, UserDataManager.getDataForPuzzle(props.puzzle.id)));
    }, []);

    /**
     * Handler that handles the action of a user pressing a tile.  
     * @param r - Row value for the tile pressed.
     * @param c - Column value for the tile pressed.
     */
    function handleTilePress(r: number, c: number) {

        // First, ensure that the game model exists. 
        if (gameModel != null) {

            // Create a clone of the existing game model to make changes.
            // This is required, or else React will not recognize a state change.
            let newModel = Object.assign(new GameModel(props.puzzle), gameModel);

            // Determine if the tile is a cooridor tile.
            if (gameModel.activePuzzle.getTileType(r, c) == TileType.cooridor) {
                // Check if the tile does not contain a lamp.
                if (gameModel.isLamp(r, c) == false) {
                    // If not, add a lamp for that tile.
                    newModel.addLamp(r, c);
                    // Update the model.
                    setGameModel((_) => newModel);
                    // Otherwise, the tile already has a lamp.
                } else {
                    // Remove the lamp for that tile.
                    gameModel.removeLamp(r, c);
                    // Update the model.    
                    setGameModel((_) => newModel);
                }
            }

            // Ensure that the model is updated.
            setGameModel((_) => newModel);

            // Set the user data reflecting the changes.
            UserDataManager.setDataForPuzzle(props.puzzle.id, newModel.lampList);
        }
    }

    // Represents the grid template style.
    let gridTemplateColumnsStyle = "";

    // Change the grid template style to correctly reflect the number of columns to show.
    if (gameModel != null) {
        gridTemplateColumnsStyle = "repeat(" + gameModel.activePuzzle.getWidth().toString() + ", minmax(0, 1fr))";
    }

    // Render the puzzle board.
    return (
        <>
            {/* Puzzle section */}
            <div className="flex items-center justify-center mt-8">
                {/* Ensure that the game model has loaded. */}
                {(gameModel != null) ? (
                    // Create the table container.
                    <div className="bg-slate-400 p-2 sm:w-11/12 md:w-5/12 lg:w-3/12">
                        {/* Create a grid for the number of columns. */}
                        <div className={"grid gap-2"} style={{ gridTemplateColumns: gridTemplateColumnsStyle }}>
                            {(() => {
                                // Create an empty array for each tile.
                                const tileArray = [];
                                // Iterate over the rows.
                                for (let r = 0; r < gameModel.activePuzzle.getHeight(); r++) {
                                    // Iterate over the columns.
                                    for (let c = 0; c < gameModel.activePuzzle.getWidth(); c++) {
                                        // Create a new tile for the coordinate and add it to the array.
                                        tileArray.push(
                                            <Tile key={r.toString() + c.toString()} model={gameModel} r={r} c={c} action={() => handleTilePress(r, c)} />
                                        );
                                    }
                                }
                                // Return the array back to the JSX component.
                                return tileArray;
                            })()}
                        </div>
                    </div>
                ) : (
                    // If the model has not loaded yet, show a loading screen.
                    <p>Loading...</p>
                )
                }
            </div>
            {/* Congratulations text */}
            <div className="mt-8">
                {/* Determine if the game is solved. */}
                {(gameModel != null && gameModel.isSolved()) ? (
                    // Show congratulatory text.
                    <div className="text-center">
                        <p className="font-bold font-mono text-xl text-teal-500">CONGRATULATIONS!</p>
                        <br />
                        <p className="font-semibold font-mono text-lg text-teal-500">You solved the puzzle.</p>
                    </div>
                ) : (
                    // If the game is not solved, show nothing.
                    <></>
                )}
            </div>
        </>
    );
}

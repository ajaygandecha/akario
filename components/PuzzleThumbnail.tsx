import { Puzzle } from "@prisma/client";
import Coordinate from "../modules/Coordinate";
import GameModel from "../modules/GameModel";
import PuzzleWrapper from "../modules/PuzzleWrapper";
import TileThumbnail from "./TileThumbnail";

/**
 * Component for the Puzzle thumbnail.
 * @param props - Contains the puzzle and user data for the thumbnail.
 * @returns the render for the puzzle thumbnail.
 */
export default function PuzzleThumbnail(props: { puzzle: Puzzle, userDataForPuzzle: Coordinate[] }) {

    // Create a new `PuzzleWrapper` object for the puzzle.
    const puzzle = new PuzzleWrapper(props.puzzle);

    // Change the grid template style to correctly reflect the number of columns to show.
    const gridTemplateColumnsStyle = "repeat(" + puzzle.getWidth().toString() + ", minmax(0, 1fr))";

    // Render the puzzle thumbnail.
    return (
        // Create the table container.
        <div className="bg-slate-400 p-1 m-2">
            {/* Create a grid for the number of columns. */}
            <div className={"grid gap-1"} style={{ gridTemplateColumns: gridTemplateColumnsStyle }}>
                {(() => {
                    // Create an empty array for each tile.
                    const tileArray = [];
                    // Iterate over the rows.
                    for (let r = 0; r < puzzle.getHeight(); r++) {
                        // Iterate over the columns.
                        for (let c = 0; c < puzzle.getWidth(); c++) {
                            // Create a new tile for the coordinate and add it to the array.
                            tileArray.push(
                                <TileThumbnail key={r.toString() + c.toString()} model={new GameModel(props.puzzle, props.userDataForPuzzle)} r={r} c={c} />
                            );
                        }
                    }
                    // Return the array back to the JSX component.
                    return tileArray;
                })()}
            </div>
        </div>
    );
}

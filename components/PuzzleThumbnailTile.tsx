import { Puzzle } from "@prisma/client";
import Coordinate from "../modules/Coordinate";
import GameModel from "../modules/GameModel";
import PuzzleThumbnail from "./PuzzleThumbnail";

/**
 * Component for the Puzzle thumbnail tiles on the home screen.
 * @param props - Contains the puzzle, puzzle ID, difficulty, and user data for the puzzle.
 * @returns the render for the puzzle thumbnail tile.
 */
export default function PuzzleThumbnailTile(props: { puzzle: Puzzle, puzzleID: number, difficulty: number, userDataForPuzzle: Coordinate[] }) {

    // Set the initial difficulty text. 
    let difficultyText = "Unknown";

    // Set the difficulty text based on the difficulty value.
    if (props.difficulty === 1) { difficultyText = "Easy (7x7)" }
    else if (props.difficulty === 2) { difficultyText = "Medium (10x10)" }
    else if (props.difficulty === 3) { difficultyText = "Hard (14x14)" }

    // Set the initial progress text and color.
    let progressText = "Not Started";
    let progressTextColor = "text-gray-700";

    // If the user has data for the puzzle, set the text and color to the "In Progress" state.
    if (props.userDataForPuzzle.length > 0) {
        progressText = "In Progress";
        progressTextColor = "text-yellow-500";
    }

    // If the user has solved the puzzle, set the text and color to the "Solved!" state.
    if (new GameModel(props.puzzle, props.userDataForPuzzle).isSolved()) {
        progressText = "Solved!";
        progressTextColor = "text-teal-500";
    }

    // Render the puzzle thumbnail.
    return (
        // Puzzle thumbnail shell.
        <div className="w-48 rounded overflow-hidden border-t-2 border-l-2 border-b-4 border-r-4 border-gray-500 hover:border-gray-300 bg-white">
            {/* Top section for the puzzle thumbnail. */}
            <div className="w-full aspect-square bg-slate-50">
                <PuzzleThumbnail puzzle={props.puzzle} userDataForPuzzle={props.userDataForPuzzle} />
            </div>
            {/* Bottom section with information. */}
            <div className="px-6 py-4">
                {/* Puzzle ID. */}
                <p className="text-gray-500 text-base text-center font-mono">
                    Puzzle #{props.puzzleID}
                </p>
                {/* Puzzle difficulty text. */}
                <p className="text-gray-500 text-base text-center font-mono">
                    {difficultyText}
                </p>
                {/* Puzzle progress text. */}
                <p className={progressTextColor + " text-gray-700 text-base font-bold text-center font-mono"}>
                    {progressText}
                </p>
            </div>
        </div>
    );
}
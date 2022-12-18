import { Puzzle } from "@prisma/client";
import Coordinate from "../modules/Coordinate";
import GameModel from "../modules/GameModel";
import PuzzleThumbnail from "./PuzzleThumbnail";

export default function PuzzleThumbnailTile(props: {puzzle: Puzzle, puzzleID: number, difficulty: number, userDataForPuzzle: Coordinate[]}) {

    let difficultyText = "Unknown";

    if(props.difficulty === 1) { difficultyText = "Easy (7x7)" }
    else if(props.difficulty === 2) { difficultyText = "Medium (10x10)" }
    else if(props.difficulty === 3) { difficultyText = "Hard (14x14)" }

    let progressText = "Not Started";

    if(props.userDataForPuzzle.length > 0) {
        progressText = "In Progress";
    }
    if(new GameModel(props.puzzle, props.userDataForPuzzle).isSolved()) {
        progressText = "Solved!";
    }

    return (
        <div className="w-48 rounded overflow-hidden border-t-2 border-l-2 border-b-4 border-r-4 border-gray-500 hover:border-gray-300 bg-white">
            <div className="w-full aspect-square bg-slate-50">
                <PuzzleThumbnail puzzle={props.puzzle} userDataForPuzzle={props.userDataForPuzzle} />
            </div>
            <div className="px-6 py-4">
                <p className="text-gray-500 text-base text-center font-mono">
                    Puzzle #{props.puzzleID}
                </p>
                <p className="text-gray-500 text-base text-center font-mono">
                    {difficultyText}
                </p>
                <p className="text-gray-700 text-base font-bold text-center font-mono">
                    {progressText}
                </p>
            </div>
        </div>
    );
}
import { Puzzle } from "@prisma/client";
import PuzzleThumbnail from "./PuzzleThumbnail";

export default function PuzzleThumbnailTile(props: {puzzle: Puzzle, puzzleID: number, difficulty: number}) {

    let difficultyText = "Unknown";

    if(props.difficulty === 1) { difficultyText = "Easy (7x7)" }
    else if(props.difficulty === 2) { difficultyText = "Medium (10x10)" }
    else if(props.difficulty === 3) { difficultyText = "Hard (14x14)" }

    return (
        <div className="w-48 rounded overflow-hidden border-b-4 border-r-4 border-gray-500 hover:border-gray-300 bg-white">
            <div className="w-full aspect-square bg-slate-50">
                <PuzzleThumbnail puzzle={props.puzzle} />
            </div>
            <div className="px-6 py-4">
                <p className="text-gray-500 text-base text-center font-mono">
                    Puzzle #{props.puzzleID}
                </p>
                <p className="text-gray-500 text-base text-center font-mono">
                    {difficultyText}
                </p>
                <p className="text-gray-700 text-base font-bold text-center font-mono">
                    Not Started
                </p>
            </div>
        </div>
    );
}
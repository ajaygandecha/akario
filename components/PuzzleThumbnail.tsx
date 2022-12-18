import { Puzzle } from "@prisma/client";
import Coordinate from "../modules/Coordinate";
import GameModel from "../modules/GameModel";
import PuzzleWrapper from "../modules/PuzzleWrapper";
import TileThumbnail from "./TileThumbnail";

export default function PuzzleThumbnail(props: {puzzle: Puzzle, userDataForPuzzle: Coordinate[]}) {

    const puzzle = new PuzzleWrapper(props.puzzle);

    const gridTemplateColumnsStyle = "repeat(" + puzzle.getWidth().toString() + ", minmax(0, 1fr))";

    return(
        <div className="bg-slate-400 p-1 m-2">
            <div className={"grid gap-1"} style={{gridTemplateColumns : gridTemplateColumnsStyle}}>
                {(()=>{
                    const tileArray = [];
                    for(let r = 0; r < puzzle.getHeight(); r++) {
                        for(let c = 0; c < puzzle.getWidth(); c++) {
                            tileArray.push(
                                <TileThumbnail key={r.toString() + c.toString()} model={new GameModel(props.puzzle, props.userDataForPuzzle)} r={r} c={c}/>
                            );
                        }
                    }
                    return tileArray;
                })()}
            </div>
        </div>
    );
}

import React, { MouseEventHandler } from "react";
import GameModel, { TileStyleType } from "../modules/GameModel";

/**
 * Component for each puzzle tile.
 * @param props - Contains the model, row, column, and action for the cell.
 * @returns the render for the puzzle tile.
 */
export default function Tile(props: { model: GameModel, r: number, c: number, action: MouseEventHandler<HTMLDivElement> }) {

    // Set the style for the tile based on the tile's style type.
    // Returns the tile.
    switch (props.model.tileStyleType(props.r, props.c)) {
        case TileStyleType.clueStyle:
            return (<div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.cooridorStyle:
            return (<div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.invalidLampStyle:
            return (<div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>*</div>);
        case TileStyleType.lampStyle:
            return (<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>*</div>);
        case TileStyleType.litStyle:
            return (<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.satisfiedClueStyle:
            return (<div className={"bg-black aspect-square text-teal-400 flex  justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.wallStyle:
            return (<div className={"bg-black aspect-square flex  justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.solvedCooridorStyle:
            return (<div className={"bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
        case TileStyleType.solvedCooridorLampStyle:
            return (<div className={"bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>*</div>);
        default:
            return (<div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={props.action}>{props.model.clueText(props.r, props.c)}</div>);
    }
}

/** Enumeration for the three different types of tiles. */
export const TileType = {
    clue: 0,
    cooridor: 1,
    wall: 2,
};
import React from "react";
import GameModel, { TileStyleType } from "../modules/GameModel";

export default function TileThumbnail(props: {model: GameModel, r: number, c: number}) {

    switch(props.model.tileStyleType(props.r, props.c)) {
        case TileStyleType.clueStyle:
            return(<div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.cooridorStyle:
            return(<div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.invalidLampStyle:
            return(<div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.lampStyle:
            return(<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.litStyle:
            return(<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.satisfiedClueStyle:
            return(<div className={"bg-black aspect-square text-teal-400 flex  justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.wallStyle:
            return(<div className={"bg-black aspect-square flex  justify-center content-center flex-col text-center"}></div>);
        case TileStyleType.solvedCooridorStyle:
            return(<div className={"bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);    
        case TileStyleType.solvedCooridorLampStyle:
            return(<div className={"bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
        default:
            return(<div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
    }
}
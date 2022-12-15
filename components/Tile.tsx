import React from "react";
import { useState } from "react";
import GameModel from "../modules/GameModel";


// CLASS COMPONENT

 

export function WallStyleTile() {
    return(<div className={"bg-black aspect-square"}></div>);
}

export function ClueStyleTile() {
    return(<div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
}

export function SatisfiedClueStyleTile() {
    return(<div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"}></div>);
}

export function LitStyleTile() {
    return(<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
}

export function LampStyleTile() {
    return(<div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
}

export function InvalidLampStyleTile() {
    return(<div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
}

export function CooridorStyleTile() {
    return(<div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"}></div>);
    
}



/*
export default function Tile(props: { model: GameModel, r: number, c: number }) {
    
    function appStyle() {
            
        // Determine result based on the type:
        if(tileType == TileType.wall) {
            return "bg-black aspect-square";
        }
        else if(tileType == TileType.clue) {
    
            // Check if clue is solved
            if(props.model.isClueSatisfied(props.r, props.c)) {
                return "bg-black aspect-square text-teal-400  flex justify-center content-center flex-col text-center";
            }
            else {
                return "bg-black aspect-square text-white flex justify-center content-center flex-col text-center";
            }
        }
        else {
            // Check if cell is lit
            if(props.model.isLit(props.r, props.c)) {
                return "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            // Check if lamp
            if(props.model.isLamp(props.r, props.c)) {
                return "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            // Check if cell is invalid
            if(props.model.isLit(props.r, props.c) && props.model.isLampIllegal(props.r, props.c)) {
                return "bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            else {
                return "bg-white aspect-square text-white flex justify-center content-center flex-col text-center";
            }
        }
    }


    let tileType = props.model.activePuzzle.getTileType(props.r, props.c);
    let clue = -1;
    
    if(tileType == TileType.clue) {
        clue = props.model.activePuzzle.getClue(props.r, props.c);
    }

    const style = appStyle();

    return(<div className={style}>{clue}</div>);


    // // Determine result based on the type:
    // if(tileType == TileType.wall) {
    //     return(<div className="bg-black aspect-square"></div>);
    // }
    // else if(tileType == TileType.clue) {

    //     // Check if clue is solved
    //     if(props.model.isClueSatisfied(props.r, props.c)) {
    //         return(<div className="bg-black aspect-square text-teal-400  flex justify-center content-center flex-col text-center">{clue}</div>);
    //     }
    //     else {
    //         return(<div className="bg-black aspect-square text-white flex justify-center content-center flex-col text-center">{clue}</div>);
    //     }
    // }
    // else {
    //     // Check if cell is lit
    //     if(props.model.isLit(props.r, props.c)) {
    //         return(<div className="bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
    //     }
    //     // Check if lamp
    //     if(props.model.isLamp(props.r, props.c)) {
    //         return(<div className="bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
    //     }
    //     // Check if cell is invalid
    //     if(props.model.isLit(props.r, props.c) && props.model.isLampIllegal(props.r, props.c)) {
    //         return(<div className="bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
    //     }
    //     else {
    //         return(<div className="bg-white aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
    //     }
    // }

*/
    /*
    else if(tileType == TileType.clue) {
        if(tileState == TileState.clue_satisfied) {
            return(<div className="bg-black aspect-square text-teal-400  flex justify-center content-center flex-col text-center">{props.clue}</div>);
        }
        else {
            return(<div className="bg-black aspect-square text-white flex justify-center content-center flex-col text-center">{props.clue}</div>);
        }
    }
    else {
        switch(tileState) {
            case TileState.lit:
                return(<div className="bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
            case TileState.clue_satisfied:
                return(<div className="bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
            case TileState.solved:
                return(<div className="bg-teal-400 aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
            case TileState.normal:
                return(<div className="bg-white aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
            default:
                return(<div className="bg-white aspect-square text-white flex justify-center content-center flex-col text-center"></div>);
        }
    }
    */
//}

export const TileType = {
    clue: 0,
    cooridor: 1,
    wall: 2,
};
import { useState } from "react";
import Tile, { ClueStyleTile, CooridorStyleTile, InvalidLampStyleTile, LampStyleTile, LitStyleTile, SatisfiedClueStyleTile, TileType, WallStyleTile } from "../../components/Tile";
import { useRouter } from "next/router";
import GameModel, { TileStyleType } from "../../modules/GameModel";

export default function PuzzleView() {

    const router = useRouter();
    const { id } = router.query;
    
    const [gameModel, setGameModel] = useState(new GameModel());

    /*
    const classes = "aspect-square text-white flex justify-center content-center flex-col text-center";

    function justStyle(r: number, c: number) {
            
        let tileType = gameModel.activePuzzle.getTileType(r, c);

        // Determine result based on the type:
        if(tileType == TileType.wall) {
            return {"background-color": "rgb(0 0 0"};
        }
        else if(tileType == TileType.clue) {
    
            // Check if clue is solved
            if(gameModel.isClueSatisfied(r, c)) {
                return {"background-color": "rgb(0 0 0", "color": "rgb(45 212 191)"};
            }
            else {
                return {"background-color": "rgb(0 0 0"};
            }
        }
        else {
            // Check if cell is lit
            if(gameModel.isLit(r, c)) {
                return {"background-color": "rgb(253 224 71)"};
            }
            // Check if lamp
            if(gameModel.isLamp(r, c)) {
                return {"background-color": "rgb(253 224 71)"};
            }
            // Check if cell is invalid
            if(gameModel.isLit(r, c) && gameModel.isLampIllegal(r, c)) {
                return {"background-color": "rgb(248, 113, 113)"};
            }
            else {
                return {"background-color": "rgb(255 255 255)"};
            }
        }
    }
    
    const wallStyle = "bg-black aspect-square";
    const clueStyle = "bg-black aspect-square text-white flex justify-center content-center flex-col text-center";
    const satisfiedClueStyle = "bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center";
    const litStyle = "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
    const lampStyle = "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
    const invalidLampStyle = "bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center";
    const cooridorStyle = "bg-white aspect-square text-white flex justify-center content-center flex-col text-center";

    let tileTypes: number[][] = [];

    for(let i = 0; i < 7; i++) {
        let colStyles: number[] = [];
        for(let j = 0; j < 7; j++) {
            colStyles.push(gameModel.activePuzzle.getTileType(i, j));
        }
        tileTypes.push(colStyles);
    }
    */
    // (tileTypes[0][0] == TileType.wall) ? 
    //     (wallStyle)
    // :
    // (
    //     (tileTypes[0][0] == TileType.clue) ?
    //         (gameModel.isClueSatisfied(0, 0) ? satisfiedClueStyle : clueStyle)
    //     :
    //     (
    //         (gameModel.isLamp(0, 0)) ? 
    //             (lampStyle)
    //         :
    //         (
    //             (gameModel.isLit(0, 0)) ?
    //                 (gameModel.isLampIllegal(0, 0) ? invalidLampStyle : litStyle)
    //             :
    //             (cooridorStyle)
    //         )
    //     )
    // )


   // (tileTypes[0][0] == TileType.wall) ? (wallStyle) :((tileTypes[0][0] == TileType.clue) ? (gameModel.isClueSatisfied(0, 0) ? satisfiedClueStyle : clueStyle) : ( (gameModel.isLamp(0, 0)) ? (lampStyle) : ( (gameModel.isLit(0, 0)) ? (gameModel.isLampIllegal(0, 0) ? invalidLampStyle : litStyle) : (cooridorStyle))))
    /*
    function tileStyle(r: number, c: number) {
            
        let tileType = gameModel.activePuzzle.getTileType(r, c);

        // Determine result based on the type:
        if(tileType == TileType.wall) {
            return "bg-black aspect-square";
        }
        else if(tileType == TileType.clue) {
    
            // Check if clue is solved
            if(gameModel.isClueSatisfied(r, c)) {
                return "bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center";
            }
            else {
                return "bg-black aspect-square text-white flex justify-center content-center flex-col text-center";
            }
        }
        else {
            // Check if cell is lit
            if(gameModel.isLit(r, c)) {
                return "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            // Check if lamp
            if(gameModel.isLamp(r, c)) {
                return "bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            // Check if cell is invalid
            if(gameModel.isLit(r, c) && gameModel.isLampIllegal(r, c)) {
                return "bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center";
            }
            else {
                return "bg-white aspect-square text-white flex justify-center content-center flex-col text-center";
            }
        }
    }
    */

    function handleTilePress(r: number, c: number) {
        
        let newModel = Object.assign(new GameModel(), gameModel);

        // First, handle adding and removing lamps
        if (gameModel.activePuzzle.getTileType(r, c) == TileType.cooridor) {
            if (gameModel.isLamp(r, c) == false) {

                console.log("Adding lamp");

                newModel.addLamp(r, c);
                
                setGameModel((previous) => newModel);

            } else {

                console.log("Removing lamp");

                gameModel.removeLamp(r, c);       
            
                setGameModel((previous) => newModel);
            }

        }

        console.log(gameModel);

        setGameModel((previous) => newModel);

        //console.log(new Coordinate(r, c).getCoordinatesInViewForPuzzle(gameModel.activePuzzle));
        //test
    }
    
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
                    <div className="bg-slate-400 p-2 sm:w-7/12 md:w-5/12 lg:w-3/12 aspect-square">
                        <div className="grid grid-cols-7 gap-2">
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

                        {/* {
                            (gameModel.tileStyleType(0,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> :
                            (
                                (gameModel.tileStyleType(0,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> : (
                                    (gameModel.tileStyleType(0,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> : (
                                        (gameModel.tileStyleType(0,0) === TileStyleType.lampStyle) ? <div style={{backgroundColor: "rgb(253 224 71)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> : (
                                            (gameModel.tileStyleType(0,0) === TileStyleType.litStyle) ? <div style={{backgroundColor: "rgb(253 224 71)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> : (
                                                (gameModel.tileStyleType(0,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> : (
                                                    (gameModel.tileStyleType(0,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                        <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        } */}
                        {/* {   
                            (gameModel.tileStyleType(0,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> :
                            (
                                (gameModel.tileStyleType(0,1) === TileStyleType.cooridorStyle) ? <div style={{backgroundColor: "rgb(255 255 255)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> : (
                                    (gameModel.tileStyleType(0,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> : (
                                        (gameModel.tileStyleType(0,1) === TileStyleType.lampStyle) ? <div style={{backgroundColor: "rgb(253 224 71)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> : (
                                            (gameModel.tileStyleType(0,1) === TileStyleType.litStyle) ? <div style={{backgroundColor: "rgb(253 224 71)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> : (
                                                (gameModel.tileStyleType(0,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div> : (
                                                    (gameModel.tileStyleType(0,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                        <div style={{backgroundColor: "rgb(255 255 255)", aspectRatio: "1", color: "rgb(255 255 255)", justifyContent: "center", alignContent: "center", flexDirection: "column", textAlign: "center"}} onClick={() => { handleTilePress(0, 1)}}>{ gameModel.clueText(0, 1) }</div>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        }
                        {
                            (gameModel.tileStyleType(0,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> :
                            (
                                (gameModel.tileStyleType(0,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> : (
                                    (gameModel.tileStyleType(0,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> : (
                                        (gameModel.tileStyleType(0,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> : (
                                            (gameModel.tileStyleType(0,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> : (
                                                (gameModel.tileStyleType(0,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div> : (
                                                    (gameModel.tileStyleType(0,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                        <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 2)}}>{ gameModel.clueText(0, 2) }</div>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        }
                        {
                            (gameModel.tileStyleType(0,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> :
                            (
                                (gameModel.tileStyleType(0,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> : (
                                    (gameModel.tileStyleType(0,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> : (
                                        (gameModel.tileStyleType(0,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> : (
                                            (gameModel.tileStyleType(0,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> : (
                                                (gameModel.tileStyleType(0,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div> : (
                                                    (gameModel.tileStyleType(0,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                        <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 3)}}>{ gameModel.clueText(0, 3) }</div>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        }
                        {
                        (gameModel.tileStyleType(0,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> :(
                        (gameModel.tileStyleType(0,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> : (
                        (gameModel.tileStyleType(0,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> : (
                        (gameModel.tileStyleType(0,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> : (
                        (gameModel.tileStyleType(0,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> : (
                        (gameModel.tileStyleType(0,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div> : (
                        (gameModel.tileStyleType(0,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                            <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 4)}}>{ gameModel.clueText(0, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(0,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> :(
                        (gameModel.tileStyleType(0,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> : (
                        (gameModel.tileStyleType(0,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> : (
                        (gameModel.tileStyleType(0,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> : (
                        (gameModel.tileStyleType(0,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> : (
                        (gameModel.tileStyleType(0,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div> : (
                        (gameModel.tileStyleType(0,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                            <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 5)}}>{ gameModel.clueText(0, 5) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(0,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> :(
                        (gameModel.tileStyleType(0,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> : (
                        (gameModel.tileStyleType(0,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> : (
                        (gameModel.tileStyleType(0,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> : (
                        (gameModel.tileStyleType(0,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> : (
                        (gameModel.tileStyleType(0,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div> : (
                        (gameModel.tileStyleType(0,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>  { handleTilePress(0, 6)}}>{ gameModel.clueText(0, 6) }</div>)))))))
                        }


                        {
                        (gameModel.tileStyleType(1,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> :(
                        (gameModel.tileStyleType(1,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> : (
                        (gameModel.tileStyleType(1,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> : (
                        (gameModel.tileStyleType(1,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> : (
                        (gameModel.tileStyleType(1,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> : (
                        (gameModel.tileStyleType(1,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div> : (
                        (gameModel.tileStyleType(1,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 0)}}>{ gameModel.clueText(1, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(1,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> :(
                        (gameModel.tileStyleType(1,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> : (
                        (gameModel.tileStyleType(1,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> : (
                        (gameModel.tileStyleType(1,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> : (
                        (gameModel.tileStyleType(1,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> : (
                        (gameModel.tileStyleType(1,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div> : (
                        (gameModel.tileStyleType(1,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 1)}}>{ gameModel.clueText(1, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(1,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> :(
                        (gameModel.tileStyleType(1,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> : (
                        (gameModel.tileStyleType(1,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> : (
                        (gameModel.tileStyleType(1,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> : (
                        (gameModel.tileStyleType(1,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> : (
                        (gameModel.tileStyleType(1,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div> : (
                        (gameModel.tileStyleType(1,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 2)}}>{ gameModel.clueText(1, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(1,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> :(
                        (gameModel.tileStyleType(1,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> : (
                        (gameModel.tileStyleType(1,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> : (
                        (gameModel.tileStyleType(1,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> : (
                        (gameModel.tileStyleType(1,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> : (
                        (gameModel.tileStyleType(1,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div> : (
                        (gameModel.tileStyleType(1,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 3)}}>{ gameModel.clueText(1, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(1,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> :(
                        (gameModel.tileStyleType(1,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> : (
                        (gameModel.tileStyleType(1,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> : (
                        (gameModel.tileStyleType(1,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> : (
                        (gameModel.tileStyleType(1,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> : (
                        (gameModel.tileStyleType(1,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div> : (
                        (gameModel.tileStyleType(1,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 4)}}>{ gameModel.clueText(1, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(1,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> :(
                        (gameModel.tileStyleType(1,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> : (
                        (gameModel.tileStyleType(1,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> : (
                        (gameModel.tileStyleType(1,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> : (
                        (gameModel.tileStyleType(1,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> : (
                        (gameModel.tileStyleType(1,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div> : (
                        (gameModel.tileStyleType(1,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 5)}}>{ gameModel.clueText(1, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(1,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> :(
                        (gameModel.tileStyleType(1,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> : (
                        (gameModel.tileStyleType(1,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> : (
                        (gameModel.tileStyleType(1,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> : (
                        (gameModel.tileStyleType(1,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> : (
                        (gameModel.tileStyleType(1,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div> : (
                        (gameModel.tileStyleType(1,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(1, 6)}}>{ gameModel.clueText(1, 6) }</div>)))))))
                        }                                                                                                                       



{
                        (gameModel.tileStyleType(2,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> :(
                        (gameModel.tileStyleType(2,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> : (
                        (gameModel.tileStyleType(2,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> : (
                        (gameModel.tileStyleType(2,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> : (
                        (gameModel.tileStyleType(2,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> : (
                        (gameModel.tileStyleType(2,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div> : (
                        (gameModel.tileStyleType(2,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 0)}}>{ gameModel.clueText(2, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(2,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> :(
                        (gameModel.tileStyleType(2,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> : (
                        (gameModel.tileStyleType(2,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> : (
                        (gameModel.tileStyleType(2,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> : (
                        (gameModel.tileStyleType(2,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> : (
                        (gameModel.tileStyleType(2,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div> : (
                        (gameModel.tileStyleType(2,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 1)}}>{ gameModel.clueText(2, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(2,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> :(
                        (gameModel.tileStyleType(2,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> : (
                        (gameModel.tileStyleType(2,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> : (
                        (gameModel.tileStyleType(2,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> : (
                        (gameModel.tileStyleType(2,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> : (
                        (gameModel.tileStyleType(2,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div> : (
                        (gameModel.tileStyleType(2,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 2)}}>{ gameModel.clueText(2, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(2,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> :(
                        (gameModel.tileStyleType(2,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> : (
                        (gameModel.tileStyleType(2,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> : (
                        (gameModel.tileStyleType(2,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> : (
                        (gameModel.tileStyleType(2,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> : (
                        (gameModel.tileStyleType(2,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div> : (
                        (gameModel.tileStyleType(2,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 3)}}>{ gameModel.clueText(2, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(2,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> :(
                        (gameModel.tileStyleType(2,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> : (
                        (gameModel.tileStyleType(2,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> : (
                        (gameModel.tileStyleType(2,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> : (
                        (gameModel.tileStyleType(2,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> : (
                        (gameModel.tileStyleType(2,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div> : (
                        (gameModel.tileStyleType(2,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 4)}}>{ gameModel.clueText(2, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(2,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> :(
                        (gameModel.tileStyleType(2,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> : (
                        (gameModel.tileStyleType(2,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> : (
                        (gameModel.tileStyleType(2,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> : (
                        (gameModel.tileStyleType(2,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> : (
                        (gameModel.tileStyleType(2,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div> : (
                        (gameModel.tileStyleType(2,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 5)}}>{ gameModel.clueText(2, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(2,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> :(
                        (gameModel.tileStyleType(2,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> : (
                        (gameModel.tileStyleType(2,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> : (
                        (gameModel.tileStyleType(2,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> : (
                        (gameModel.tileStyleType(2,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> : (
                        (gameModel.tileStyleType(2,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div> : (
                        (gameModel.tileStyleType(2,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(2, 6)}}>{ gameModel.clueText(2, 6) }</div>)))))))
                        } 


{
                        (gameModel.tileStyleType(3,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> :(
                        (gameModel.tileStyleType(3,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> : (
                        (gameModel.tileStyleType(3,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> : (
                        (gameModel.tileStyleType(3,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> : (
                        (gameModel.tileStyleType(3,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> : (
                        (gameModel.tileStyleType(3,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div> : (
                        (gameModel.tileStyleType(3,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 0)}}>{ gameModel.clueText(3, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(3,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> :(
                        (gameModel.tileStyleType(3,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> : (
                        (gameModel.tileStyleType(3,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> : (
                        (gameModel.tileStyleType(3,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> : (
                        (gameModel.tileStyleType(3,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> : (
                        (gameModel.tileStyleType(3,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div> : (
                        (gameModel.tileStyleType(3,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 1)}}>{ gameModel.clueText(3, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(3,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> :(
                        (gameModel.tileStyleType(3,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> : (
                        (gameModel.tileStyleType(3,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> : (
                        (gameModel.tileStyleType(3,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> : (
                        (gameModel.tileStyleType(3,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> : (
                        (gameModel.tileStyleType(3,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div> : (
                        (gameModel.tileStyleType(3,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 2)}}>{ gameModel.clueText(3, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(3,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> :(
                        (gameModel.tileStyleType(3,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> : (
                        (gameModel.tileStyleType(3,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> : (
                        (gameModel.tileStyleType(3,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> : (
                        (gameModel.tileStyleType(3,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> : (
                        (gameModel.tileStyleType(3,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div> : (
                        (gameModel.tileStyleType(3,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 3)}}>{ gameModel.clueText(3, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(3,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> :(
                        (gameModel.tileStyleType(3,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> : (
                        (gameModel.tileStyleType(3,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> : (
                        (gameModel.tileStyleType(3,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> : (
                        (gameModel.tileStyleType(3,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> : (
                        (gameModel.tileStyleType(3,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div> : (
                        (gameModel.tileStyleType(3,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 4)}}>{ gameModel.clueText(3, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(3,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> :(
                        (gameModel.tileStyleType(3,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> : (
                        (gameModel.tileStyleType(3,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> : (
                        (gameModel.tileStyleType(3,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> : (
                        (gameModel.tileStyleType(3,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> : (
                        (gameModel.tileStyleType(3,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div> : (
                        (gameModel.tileStyleType(3,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 5)}}>{ gameModel.clueText(3, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(3,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> :(
                        (gameModel.tileStyleType(3,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> : (
                        (gameModel.tileStyleType(3,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> : (
                        (gameModel.tileStyleType(3,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> : (
                        (gameModel.tileStyleType(3,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> : (
                        (gameModel.tileStyleType(3,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div> : (
                        (gameModel.tileStyleType(3,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(3, 6)}}>{ gameModel.clueText(3, 6) }</div>)))))))
                        }                                   

                        {
                        (gameModel.tileStyleType(4,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> :(
                        (gameModel.tileStyleType(4,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> : (
                        (gameModel.tileStyleType(4,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> : (
                        (gameModel.tileStyleType(4,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> : (
                        (gameModel.tileStyleType(4,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> : (
                        (gameModel.tileStyleType(4,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div> : (
                        (gameModel.tileStyleType(4,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 0)}}>{ gameModel.clueText(4, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(4,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> :(
                        (gameModel.tileStyleType(4,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> : (
                        (gameModel.tileStyleType(4,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> : (
                        (gameModel.tileStyleType(4,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> : (
                        (gameModel.tileStyleType(4,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> : (
                        (gameModel.tileStyleType(4,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div> : (
                        (gameModel.tileStyleType(4,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 1)}}>{ gameModel.clueText(4, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(4,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> :(
                        (gameModel.tileStyleType(4,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> : (
                        (gameModel.tileStyleType(4,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> : (
                        (gameModel.tileStyleType(4,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> : (
                        (gameModel.tileStyleType(4,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> : (
                        (gameModel.tileStyleType(4,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div> : (
                        (gameModel.tileStyleType(4,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 2)}}>{ gameModel.clueText(4, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(4,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> :(
                        (gameModel.tileStyleType(4,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> : (
                        (gameModel.tileStyleType(4,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> : (
                        (gameModel.tileStyleType(4,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> : (
                        (gameModel.tileStyleType(4,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> : (
                        (gameModel.tileStyleType(4,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div> : (
                        (gameModel.tileStyleType(4,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 3)}}>{ gameModel.clueText(4, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(4,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> :(
                        (gameModel.tileStyleType(4,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> : (
                        (gameModel.tileStyleType(4,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> : (
                        (gameModel.tileStyleType(4,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> : (
                        (gameModel.tileStyleType(4,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> : (
                        (gameModel.tileStyleType(4,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div> : (
                        (gameModel.tileStyleType(4,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 4)}}>{ gameModel.clueText(4, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(4,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> :(
                        (gameModel.tileStyleType(4,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> : (
                        (gameModel.tileStyleType(4,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> : (
                        (gameModel.tileStyleType(4,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> : (
                        (gameModel.tileStyleType(4,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> : (
                        (gameModel.tileStyleType(4,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div> : (
                        (gameModel.tileStyleType(4,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 5)}}>{ gameModel.clueText(4, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(4,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> :(
                        (gameModel.tileStyleType(4,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> : (
                        (gameModel.tileStyleType(4,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> : (
                        (gameModel.tileStyleType(4,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> : (
                        (gameModel.tileStyleType(4,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> : (
                        (gameModel.tileStyleType(4,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div> : (
                        (gameModel.tileStyleType(4,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(4, 6)}}>{ gameModel.clueText(4, 6) }</div>)))))))
                        }      



                        {
                        (gameModel.tileStyleType(5,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> :(
                        (gameModel.tileStyleType(5,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> : (
                        (gameModel.tileStyleType(5,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> : (
                        (gameModel.tileStyleType(5,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> : (
                        (gameModel.tileStyleType(5,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> : (
                        (gameModel.tileStyleType(5,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div> : (
                        (gameModel.tileStyleType(5,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 0)}}>{ gameModel.clueText(5, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(5,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> :(
                        (gameModel.tileStyleType(5,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> : (
                        (gameModel.tileStyleType(5,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> : (
                        (gameModel.tileStyleType(5,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> : (
                        (gameModel.tileStyleType(5,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> : (
                        (gameModel.tileStyleType(5,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div> : (
                        (gameModel.tileStyleType(5,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 1)}}>{ gameModel.clueText(5, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(5,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> :(
                        (gameModel.tileStyleType(5,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> : (
                        (gameModel.tileStyleType(5,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> : (
                        (gameModel.tileStyleType(5,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> : (
                        (gameModel.tileStyleType(5,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> : (
                        (gameModel.tileStyleType(5,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div> : (
                        (gameModel.tileStyleType(5,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 2)}}>{ gameModel.clueText(5, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(5,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> :(
                        (gameModel.tileStyleType(5,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> : (
                        (gameModel.tileStyleType(5,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> : (
                        (gameModel.tileStyleType(5,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> : (
                        (gameModel.tileStyleType(5,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> : (
                        (gameModel.tileStyleType(5,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div> : (
                        (gameModel.tileStyleType(5,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 3)}}>{ gameModel.clueText(5, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(5,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> :(
                        (gameModel.tileStyleType(5,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> : (
                        (gameModel.tileStyleType(5,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> : (
                        (gameModel.tileStyleType(5,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> : (
                        (gameModel.tileStyleType(5,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> : (
                        (gameModel.tileStyleType(5,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div> : (
                        (gameModel.tileStyleType(5,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 4)}}>{ gameModel.clueText(5, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(5,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> :(
                        (gameModel.tileStyleType(5,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> : (
                        (gameModel.tileStyleType(5,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> : (
                        (gameModel.tileStyleType(5,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> : (
                        (gameModel.tileStyleType(5,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> : (
                        (gameModel.tileStyleType(5,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div> : (
                        (gameModel.tileStyleType(5,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 5)}}>{ gameModel.clueText(5, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(5,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> :(
                        (gameModel.tileStyleType(5,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> : (
                        (gameModel.tileStyleType(5,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> : (
                        (gameModel.tileStyleType(5,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> : (
                        (gameModel.tileStyleType(5,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> : (
                        (gameModel.tileStyleType(5,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div> : (
                        (gameModel.tileStyleType(5,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(5, 6)}}>{ gameModel.clueText(5, 6) }</div>)))))))
                        }   



                        {
                        (gameModel.tileStyleType(6,0) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> :(
                        (gameModel.tileStyleType(6,0) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> : (
                        (gameModel.tileStyleType(6,0) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> : (
                        (gameModel.tileStyleType(6,0) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> : (
                        (gameModel.tileStyleType(6,0) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> : (
                        (gameModel.tileStyleType(6,0) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div> : (
                        (gameModel.tileStyleType(6,0) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 0)}}>{ gameModel.clueText(6, 0) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(6,1) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> :(
                        (gameModel.tileStyleType(6,1) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> : (
                        (gameModel.tileStyleType(6,1) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> : (
                        (gameModel.tileStyleType(6,1) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> : (
                        (gameModel.tileStyleType(6,1) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> : (
                        (gameModel.tileStyleType(6,1) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div> : (
                        (gameModel.tileStyleType(6,1) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 1)}}>{ gameModel.clueText(6, 1) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(6,2) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> :(
                        (gameModel.tileStyleType(6,2) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> : (
                        (gameModel.tileStyleType(6,2) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> : (
                        (gameModel.tileStyleType(6,2) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> : (
                        (gameModel.tileStyleType(6,2) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> : (
                        (gameModel.tileStyleType(6,2) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div> : (
                        (gameModel.tileStyleType(6,2) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 2)}}>{ gameModel.clueText(6, 2) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(6,3) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> :(
                        (gameModel.tileStyleType(6,3) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> : (
                        (gameModel.tileStyleType(6,3) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> : (
                        (gameModel.tileStyleType(6,3) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> : (
                        (gameModel.tileStyleType(6,3) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> : (
                        (gameModel.tileStyleType(6,3) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div> : (
                        (gameModel.tileStyleType(6,3) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 3)}}>{ gameModel.clueText(6, 3) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(6,4) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> :(
                        (gameModel.tileStyleType(6,4) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> : (
                        (gameModel.tileStyleType(6,4) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> : (
                        (gameModel.tileStyleType(6,4) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> : (
                        (gameModel.tileStyleType(6,4) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> : (
                        (gameModel.tileStyleType(6,4) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div> : (
                        (gameModel.tileStyleType(6,4) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 4)}}>{ gameModel.clueText(6, 4) }</div>)))))))
                        }
                        {
                        (gameModel.tileStyleType(6,5) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> :(
                        (gameModel.tileStyleType(6,5) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> : (
                        (gameModel.tileStyleType(6,5) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> : (
                        (gameModel.tileStyleType(6,5) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> : (
                        (gameModel.tileStyleType(6,5) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> : (
                        (gameModel.tileStyleType(6,5) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div> : (
                        (gameModel.tileStyleType(6,5) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 5)}}>{ gameModel.clueText(6, 5) }</div>)))))))
                        } 
                        {
                        (gameModel.tileStyleType(6,6) === TileStyleType.clueStyle) ? <div className={"bg-black aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>             { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> :(
                        (gameModel.tileStyleType(6,6) === TileStyleType.cooridorStyle) ? <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> : (
                        (gameModel.tileStyleType(6,6) === TileStyleType.invalidLampStyle) ? <div className={"bg-red-400 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>    { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> : (
                        (gameModel.tileStyleType(6,6) === TileStyleType.lampStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>        { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> : (
                        (gameModel.tileStyleType(6,6) === TileStyleType.litStyle) ? <div className={"bg-yellow-300 aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() =>         { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> : (
                        (gameModel.tileStyleType(6,6) === TileStyleType.satisfiedClueStyle) ? <div className={"bg-black aspect-square text-teal-400 flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div> : (
                        (gameModel.tileStyleType(6,6) === TileStyleType.wallStyle) ? <div className={"bg-black aspect-square"}></div> : (
                                                                                                 <div className={"bg-white aspect-square text-white flex justify-center content-center flex-col text-center"} onClick={() => { handleTilePress(6, 6)}}>{ gameModel.clueText(6, 6) }</div>)))))))
                        }       */}

                            {/* {
                            (gameModel.tileStyleType(0,0) === TileStyleType.clueStyle) ? <ClueStyleTile /> :
                            (
                                (gameModel.tileStyleType(0,0) === TileStyleType.cooridorStyle) ? <CooridorStyleTile /> : (
                                    (gameModel.tileStyleType(0,0) === TileStyleType.invalidLampStyle) ? <InvalidLampStyleTile /> : (
                                        (gameModel.tileStyleType(0,0) === TileStyleType.lampStyle) ? <LampStyleTile /> : (
                                            (gameModel.tileStyleType(0,0) === TileStyleType.litStyle) ? <LitStyleTile /> : (
                                                (gameModel.tileStyleType(0,0) === TileStyleType.satisfiedClueStyle) ? <SatisfiedClueStyleTile /> : (
                                                    (gameModel.tileStyleType(0,0) === TileStyleType.wallStyle) ? <WallStyleTile /> : (
                                                    <CooridorStyleTile />
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                            } */}
                            {/* <div className={(tileTypes[0][0] == TileType.wall) ? (wallStyle) :((tileTypes[0][0] == TileType.clue) ? (gameModel.isClueSatisfied(0, 0) ? satisfiedClueStyle : clueStyle) : ( (gameModel.isLamp(0, 0)) ? (lampStyle) : ( (gameModel.isLit(0, 0)) ? (gameModel.isLampIllegal(0, 0) ? invalidLampStyle : litStyle) : (cooridorStyle))))} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> */}
                            {/* <div className={tileStyle(0,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(0,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(0,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(0,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(0,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(0,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(1,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(1,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(2,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(2,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(3,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(3,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(4,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(4,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(5,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(5,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>

                            <div className={tileStyle(6,0)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,1)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,2)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,3)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,4)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,5)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div>
                            <div className={tileStyle(6,6)} onClick={() => { handleTilePress(0, 0)}}>{ gameModel.clueText(0, 0) }</div> */}

                            {/* <div onClick={() => { handleTilePress(0, 0)}}>
                                <Tile model={gameModel} r={0} c={0} />
                            </div>
                            <Tile model={gameModel} r={0} c={1} />
                            <Tile model={gameModel} r={0} c={2} />
                            <Tile model={gameModel} r={0} c={3} />
                            <Tile model={gameModel} r={0} c={4} />
                            <Tile model={gameModel} r={0} c={5} />
                            <Tile model={gameModel} r={0} c={6} />

                            <Tile model={gameModel} r={1} c={0} />
                            <Tile model={gameModel} r={1} c={1} />
                            <Tile model={gameModel} r={1} c={2} />
                            <Tile model={gameModel} r={1} c={3} />
                            <Tile model={gameModel} r={1} c={4} />
                            <Tile model={gameModel} r={1} c={5} />
                            <Tile model={gameModel} r={1} c={6} />

                            <Tile model={gameModel} r={2} c={0} />
                            <Tile model={gameModel} r={2} c={1} />
                            <Tile model={gameModel} r={2} c={2} />
                            <Tile model={gameModel} r={2} c={3} />
                            <Tile model={gameModel} r={2} c={4} />
                            <Tile model={gameModel} r={2} c={5} />
                            <Tile model={gameModel} r={2} c={6} />

                            <Tile model={gameModel} r={3} c={0} />
                            <Tile model={gameModel} r={3} c={1} />
                            <Tile model={gameModel} r={3} c={2} />
                            <Tile model={gameModel} r={3} c={3} />
                            <Tile model={gameModel} r={3} c={4} />
                            <Tile model={gameModel} r={3} c={5} />
                            <Tile model={gameModel} r={3} c={6} />

                            <Tile model={gameModel} r={4} c={0} />
                            <Tile model={gameModel} r={4} c={1} />
                            <Tile model={gameModel} r={4} c={2} />
                            <Tile model={gameModel} r={4} c={3} />
                            <Tile model={gameModel} r={4} c={4} />
                            <Tile model={gameModel} r={4} c={5} />
                            <Tile model={gameModel} r={4} c={6} />

                            <Tile model={gameModel} r={5} c={0} />
                            <Tile model={gameModel} r={5} c={1} />
                            <Tile model={gameModel} r={5} c={2} />
                            <Tile model={gameModel} r={5} c={3} />
                            <Tile model={gameModel} r={5} c={4} />
                            <Tile model={gameModel} r={5} c={5} />
                            <Tile model={gameModel} r={5} c={6} />

                            <Tile model={gameModel} r={6} c={0} />
                            <Tile model={gameModel} r={6} c={1} />
                            <Tile model={gameModel} r={6} c={2} />
                            <Tile model={gameModel} r={6} c={3} />
                            <Tile model={gameModel} r={6} c={4} />
                            <Tile model={gameModel} r={6} c={5} />
                            <Tile model={gameModel} r={6} c={6} /> */}

                       </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="">
                <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
            </footer>
        </div>
    )
}
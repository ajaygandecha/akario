import { Puzzle } from "@prisma/client";
import Tile, { TileType } from "../components/Tile";
import Coordinate from "./Coordinate";
import PuzzleWrapper from "./PuzzleWrapper";

/*
export const SamplePuzzles = {

  puzzle_one: new PuzzleWrapper([
    [6, 6, 6, 6, 1, 6, 6],
    [6, 6, 6, 5, 6, 6, 6],
    [0, 6, 6, 6, 6, 6, 6],
    [6, 5, 6, 6, 6, 4, 6],
    [6, 6, 6, 6, 6, 6, 5],
    [6, 6, 6, 2, 6, 6, 6],
    [6, 6, 5, 6, 6, 6, 6]
  ]),

  puzzle_two: new PuzzleWrapper([
    [6, 6, 5, 6, 6, 6],
    [6, 5, 6, 6, 6, 3],
    [6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6],
    [3, 6, 6, 6, 6, 6],
    [6, 2, 6, 6, 6, 6],
    [6, 6, 6, 6, 0, 6],
  ]),

  puzzle_three: new PuzzleWrapper([
    [6, 6, 5, 6, 6, 6, 6],
    [6, 5, 6, 6, 6, 4, 6],
    [6, 6, 6, 6, 6, 6, 5],
    [6, 6, 6, 6, 6, 6, 6],
    [3, 6, 6, 6, 6, 6, 6],
    [6, 2, 6, 6, 6, 5, 6],
    [6, 6, 6, 6, 0, 6, 6],
  ]),

  puzzle_four: new PuzzleWrapper([
    [5, 6, 6, 5, 6, 6, 6, 6, 6, 5],
    [6, 6, 6, 6, 6, 6, 6, 5, 6, 6],
    [6, 3, 6, 6, 6, 6, 0, 6, 6, 6],
    [6, 6, 2, 6, 6, 5, 6, 6, 6, 1],
    [6, 6, 6, 1, 0, 5, 6, 6, 6, 6],
    [6, 6, 6, 6, 1, 5, 5, 6, 6, 6],
    [5, 6, 6, 6, 2, 6, 6, 2, 6, 6],
    [6, 6, 6, 5, 6, 6, 6, 6, 5, 6],
    [6, 6, 1, 6, 6, 6, 6, 6, 6, 6],
    [0, 6, 6, 6, 6, 6, 1, 6, 6, 0],
  ]),
}
*/

export default class GameModel {

    activePuzzle: PuzzleWrapper;
    lampList: Coordinate[];

    constructor(puzzle: Puzzle) {
        this.activePuzzle = new PuzzleWrapper(puzzle);
        this.lampList = [];
    }

    addLamp(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
          throw new Error("Illegal arguments in addLamp");
        }
    
        if(this.lampList.findIndex((element) => element.r === r && element.c === c) === -1) {
          this.lampList.push(new Coordinate(r, c));
        }
        // if (!Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
        //   this.lampList.push(new Coordinate(r, c));
        // }
    }

    removeLamp(r: number, c:number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
            throw new Error("Illegal arguments in removeLamp");
        }
    
        // if (Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
        //     this.lampList.splice(Coordinate.indexOfCoordInList(this.lampList, new Coordinate(r, c)), 1);
        // }
        //test

        let indexOfLamp = this.lampList.findIndex((element) => element.r === r && element.c === c);
        if(indexOfLamp !== -1) {
          this.lampList.splice(indexOfLamp, 1);
        }
    }
    
    isLit(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
          throw new Error("Illegal argument in isLit");
        }
    
        if(this.lampList.findIndex((element) => element.r === r && element.c === c) !== -1) {
          return true;
        }
    
        let allLit: Coordinate[] = [];

        this.lampList.forEach(lampCoord => {

          allLit = allLit.concat(lampCoord.getCoordinatesInViewForPuzzle(this.activePuzzle));
        });

        return allLit.findIndex((element) => element.r === r && element.c === c) !== -1;
    }

    isLamp(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
            throw new Error("Illegal argument in isLamp");
        }

        let val = this.lampList.findIndex((element) => element.r === r && element.c === c) !== -1;
        
        return val;
    }

    isLampIllegal(r: number, c: number) {

        let lampCoordinate:Coordinate = new Coordinate(r, c);
    
        if(this.activePuzzle.getTileType(r, c) != TileType.cooridor
            || this.lampList.findIndex((element) => element.r === r && element.c === c) === -1) {
              throw new Error("Illegal argument in isLampIllegal");
            }
        let litFromLamp: Coordinate[] = lampCoordinate.getCoordinatesInViewForPuzzle(this.activePuzzle);
    
        let returnValue = false;
        litFromLamp.forEach(coord => {
            if(this.lampList.findIndex((element) => element.r === coord.r && element.c === coord.c) !== -1) {
              returnValue = true;
            }
        });
    
        if(returnValue) {
          return true;
        }
        return false;
    }

    resetPuzzle() {

        this.lampList = [];
    }
    
    isSolved() {

        // Check all cooridor and clue cells
        for (let i = 0; i < this.activePuzzle.getHeight(); i++) {
          for (let j = 0; j < this.activePuzzle.getWidth(); j++) {
    
            if (this.activePuzzle.getTileType(i, j) == TileType.cooridor) {
              // If not lit, return false
              if (!this.isLit(i, j)) {
                return false;
              }
            } else if (this.activePuzzle.getTileType(i, j) == TileType.clue) {
              // If clue not solved, return false
              if (!this.isClueSatisfied(i, j)) {
                return false;
              }
            }
          }
        }
    
        // Now, check each lamp
        this.lampList.forEach(lampCoord => {
            if(this.isLampIllegal(lampCoord.r, lampCoord.c)) {
                return false;
            }
        });
    
        // If all pass, then the puzzle is solved
        return true;
    }

    isClueSatisfied(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.clue) {
          throw new Error("Illegal argument in isClueSatisfied");
        }
    
        let currentCoordinate: Coordinate = new Coordinate(r, c);
        let adjacentCoordinates = currentCoordinate.getAdjacentCoordinatesForPuzzle(this.activePuzzle);
    
        let numLamps = 0;
    
        adjacentCoordinates.forEach(coord => {
            if (this.activePuzzle.getTileType(coord.r, coord.c) == TileType.cooridor
              && this.isLamp(coord.r, coord.c)) {
            numLamps++;
          }
        });
    
        return numLamps == this.activePuzzle.getClue(r, c);
    }

    tileStyleType(r: number, c: number) {
      let tileType = this.activePuzzle.getTileType(r, c);

      if(tileType == TileType.cooridor && this.isSolved() && this.isLamp(r, c)) {
        return TileStyleType.solvedCooridorLampStyle;
      }

      if(tileType == TileType.cooridor && this.isSolved()) {
        return TileStyleType.solvedCooridorStyle;
      }

      // Determine result based on the type:
      if(tileType == TileType.wall) {
          return TileStyleType.wallStyle;
      }
      else if(tileType == TileType.clue) {
  
          // Check if clue is solved
          if(this.isClueSatisfied(r, c)) {
              return TileStyleType.satisfiedClueStyle;
          }
          else {
              return TileStyleType.clueStyle;
          }
      }
      else {
          // Check if cell is invalid
          if(this.isLamp(r, c) && this.isLampIllegal(r, c)) {
              console.log("Invalid lamp hit");
              return TileStyleType.invalidLampStyle;
          }
          // Check if lamp
          if(this.isLamp(r, c)) {
            console.log("lamp hit");
            return TileStyleType.lampStyle;
          }
          // Check if cell is lit
          if(this.isLit(r, c)) {
            return TileStyleType.litStyle;
          }
          else {
              return TileStyleType.cooridorStyle;
          }
      }
    }

    clueText(r: number, c: number) {
      
      if(this.activePuzzle.getTileType(r, c) == TileType.clue) {
        return this.activePuzzle.getClue(r, c).toString();
      }
      else {
        return "";
      }
    }
}

export const TileStyleType = {
  wallStyle: 0,
  clueStyle: 1,
  satisfiedClueStyle: 2,
  litStyle: 3,
  lampStyle: 4,
  invalidLampStyle: 5,
  cooridorStyle: 6,
  solvedCooridorStyle: 7,
  solvedCooridorLampStyle: 8

};
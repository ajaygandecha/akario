import Tile, { TileType } from "../components/Tile";
import Coordinate from "./Coordinate";
import Puzzle from "./Puzzle";

export default class GameModel {

    activePuzzle: Puzzle;
    lampList: Coordinate[];

    constructor() {
        this.activePuzzle = new Puzzle([
            [6, 6, 6, 6, 1, 6, 6],
            [6, 6, 6, 5, 6, 6, 6],
            [0, 6, 6, 6, 6, 6, 6],
            [6, 5, 6, 6, 6, 4, 6],
            [6, 6, 6, 6, 6, 6, 5],
            [6, 6, 6, 2, 6, 6, 6],
            [6, 6, 5, 6, 6, 6, 6]
        ]);
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
        // if (Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
        //   return true;
        // }
    
        let allLit: Coordinate[] = [];

        this.lampList.forEach(lampCoord => {

          //console.log(lampCoord.getCoordinatesInViewForPuzzle(this.activePuzzle));
          allLit = allLit.concat(lampCoord.getCoordinatesInViewForPuzzle(this.activePuzzle));
        });

        return allLit.findIndex((element) => element.r === r && element.c === c) !== -1;
        //return Coordinate.coordListContainsItem(allLit, new Coordinate(r, c));
    }

    isLamp(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
            throw new Error("Illegal argument in isLamp");
        }

        let val = this.lampList.findIndex((element) => element.r === r && element.c === c) !== -1;
        //Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c));
        
        return val;
    }

    isLampIllegal(r: number, c: number) {

        let lampCoordinate:Coordinate = new Coordinate(r, c);

        // if (this.activePuzzle.getTileType(r, c) != TileType.cooridor
        //     || !Coordinate.coordListContainsItem(this.lampList, lampCoordinate)) {
        //   throw new Error("Illegal argument in isLampIllegal");
        // }
    
        if(this.activePuzzle.getTileType(r, c) != TileType.cooridor
            || this.lampList.findIndex((element) => element.r === r && element.c === c) === -1) {
              throw new Error("Illegal argument in isLampIllegal");
            }
        let litFromLamp: Coordinate[] = lampCoordinate.getCoordinatesInViewForPuzzle(this.activePuzzle);
    
        let returnValue = false;
        litFromLamp.forEach(coord => {
            // if(Coordinate.coordListContainsItem(this.lampList, coord)) {
            //     return true;
            // }
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
}; 
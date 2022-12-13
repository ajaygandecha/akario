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
    
        if (!Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
          this.lampList.push(new Coordinate(r, c));
        }
    }

    removeLamp(r: number, c:number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
            throw new Error("Illegal arguments in removeLamp");
        }
    
        if (Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
            this.lampList.splice(Coordinate.indexOfCoordInList(this.lampList, new Coordinate(r, c)), 1);
        }
    }
    
    isLit(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
          throw new Error("Illegal argument in isLit");
        }
    
        if (Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c))) {
          return true;
        }
    
        let allLit: Coordinate[] = [];

        this.lampList.forEach(lampCoord => {
            allLit.concat(lampCoord.getCoordinatesInViewForPuzzle(this.activePuzzle))
        });

        return Coordinate.coordListContainsItem(allLit, new Coordinate(r, c));
    }

    isLamp(r: number, c: number) {

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
            throw new Error("Illegal argument in isLamp");
        }

        return Coordinate.coordListContainsItem(this.lampList, new Coordinate(r, c));
    }

    isLampIllegal(r: number, c: number) {

        let lampCoordinate:Coordinate = new Coordinate(r, c);

        if (this.activePuzzle.getTileType(r, c) != TileType.cooridor
            || !Coordinate.coordListContainsItem(this.lampList, lampCoordinate)) {
          throw new Error("Illegal argument in isLampIllegal");
        }
    
        let litFromLamp: Coordinate[] = lampCoordinate.getCoordinatesInViewForPuzzle(this.activePuzzle);
    
        litFromLamp.forEach(coord => {
            if(Coordinate.coordListContainsItem(this.lampList, coord)) {
                return true;
            }
        });
    
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


}
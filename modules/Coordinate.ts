import Tile, { TileType } from "../components/Tile";
import Puzzle from "./PuzzleWrapper";

export default class Coordinate {

    r: number;
    c: number;

    constructor(r: number, c: number) {
        this.r = r;
        this.c = c;
    }

    equals(other: Coordinate) {

        return this.r === other.r && this.c === other.c;
    }

    getAdjacentCoordinatesForPuzzle(p: Puzzle) {

        let adjacent:Coordinate[] = [];

        // Checks if left is valid and if so, adds to list
        try {
            p.getTileType(this.r, this.c - 1);
            adjacent.push(new Coordinate(this.r, this.c - 1))
        } catch (e) {
            // Ignored
        }
  
        // Checks if right is valid and if so, adds to list
        try {
            p.getTileType(this.r, this.c + 1);
            adjacent.push(new Coordinate(this.r, this.c + 1))
        } catch (e) {
            // Ignored
        }
    
        // Checks if up is valid and if so, adds to list
        try {
            p.getTileType(this.r - 1, this.c);
            adjacent.push(new Coordinate(this.r - 1, this.c))
        } catch (e) {
            // Ignored
        }
  
        // Checks if down is valid and if so, adds to list
        try {
            p.getTileType(this.r + 1, this.c);
            adjacent.push(new Coordinate(this.r + 1, this.c))
        } catch (e) {
            // Ignored
        }

        // Finally, return list
        return adjacent;
    }

    getCoordinatesInViewForPuzzle(p: Puzzle) {

        let coordsInView:Coordinate[] = [];
    
        // Loop left
        let searchingLeft = true;
        let iL = this.c - 1;
        while (searchingLeft && iL >= 0) {
          if (p.getTileType(this.r, iL) != TileType.cooridor) {
            searchingLeft = false;
          } else {
            coordsInView.push(new Coordinate(this.r, iL));
            iL--;
          }
        }
    
        // Loop right
        let searchingRight = true;
        let iR = this.c + 1;
        while (searchingRight && iR < p.getWidth()) {
          if (p.getTileType(this.r, iR) != TileType.cooridor) {
            searchingRight = false;
          } else {
            coordsInView.push(new Coordinate(this.r, iR));
            iR++;
          }
        }
    
        // Loop up
        let searchingUp = true;
        let iU = this.r - 1;
        while (searchingUp && iU >= 0) {
          if (p.getTileType(iU, this.c) != TileType.cooridor) {
            searchingUp = false;
          } else {
            coordsInView.push(new Coordinate(iU, this.c));
            iU--;
          }
        }
    
        // Loop down
        let searchingDown = true;
        let iD = this.r + 1;
        while (searchingDown && iD < p.getHeight()) {
          if (p.getTileType(iD, this.c) != TileType.cooridor) {
            searchingDown = false;
          } else {
            coordsInView.push(new Coordinate(iD, this.c));
            iD++;
          }
        }
    
        return coordsInView;
      }

    static coordListContainsItem(li: Coordinate[], coord: Coordinate) {

       
        li.forEach(pc => {
            if(pc.equals(coord)) {
                return true;
            }
        })

        console.log("here??");
        
        return false;
    }

    static indexOfCoordInList(li:Coordinate[], coord: Coordinate) {

        for(let i = 0; i < li.length; i++) {
          if (li[i].equals(coord)) {
            return i;
          }
        }
    
        return -1;
    }
}
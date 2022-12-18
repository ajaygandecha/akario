import { TileType } from "../components/Tile";
import Puzzle from "./PuzzleWrapper";

/** Class representing a cartesian coordinate on the puzzle grid. */
export default class Coordinate {

  /** Represents the coordinate's row on the puzzle grid. */
  r: number;

  /** Represents the coordinate's row on the puzzle grid. */
  c: number;

  /**
   * Create a coordinate.
   * @param r - The row value for the coordinate.
   * @param c - The column value for the coordinate.
   */
  constructor(r: number, c: number) {
    this.r = r;
    this.c = c;
  }

  /**
   * Compares coordinate with another coordinate.
   * @param other - Other coordinate to compare with.
   * @returns `true` if coordinates are equivalent, `false` otherwise.
   */
  equals(other: Coordinate) {
    // Return true if both coordinates have the same `r` and `c` values.
    return this.r === other.r && this.c === other.c;
  }

  /**
   * Finds other coordinates immediately adjacent to this coordinate.
   * @param p - Puzzle the coordinate is on to use.
   * @returns List of adjacent coordinates.
   */
  getAdjacentCoordinatesForPuzzle(p: Puzzle) {

    // Create list of adjacent objects to return.
    let adjacent: Coordinate[] = [];

    // Checks if coordinate to the left is valid and if so, adds to list.
    try {
      // Throws error if coordinate is invalid.
      p.getTileType(this.r, this.c - 1);
      // Add valid coordinate to the list.
      adjacent.push(new Coordinate(this.r, this.c - 1))
    } catch (e) {
      // Left coordinate is invalid, so ignore.
    }

    // Checks if coordinate to the right is valid and if so, adds to list.
    try {
      // Throws error if coordinate is invalid.
      p.getTileType(this.r, this.c + 1);
      // Add valid coordinate to the list.
      adjacent.push(new Coordinate(this.r, this.c + 1))
    } catch (e) {
      // Right coordinate is invalid, so ignore.
    }

    // Checks if coordinate above is valid and if so, adds to list.
    try {
      // Throws error if coordinate is invalid.
      p.getTileType(this.r - 1, this.c);
      // Add valid coordinate to the list.
      adjacent.push(new Coordinate(this.r - 1, this.c))
    } catch (e) {
      // Above coordinate is invalid, so ignore.
    }

    // Checks if coordinate below is valid and if so, adds to list.
    try {
      // Throws error if coordinate is invalid.
      p.getTileType(this.r + 1, this.c);
      // Add valid coordinate to the list.
      adjacent.push(new Coordinate(this.r + 1, this.c))
    } catch (e) {
      // Below coordinate is invalid, so ignore.
    }

    // Finally, return the list. 
    return adjacent;
  }

  /**
   * Finds other cooridor coordinates in view of the current coordinate
   * in the four cardinal directions, up until either the edge of the
   * board or a wall tile. 
   * @param p - Puzzle the coordinate is on to use.
   * @returns List of the coordinates in view.
   */
  getCoordinatesInViewForPuzzle(p: Puzzle) {

    // Create list of in-view coordinates to return.
    let coordsInView: Coordinate[] = [];

    // Begin searching left.
    let searchingLeft = true;
    // Find first coordinate to the left.
    let iL = this.c - 1;
    // Iterate over all coordinates to the left.
    while (searchingLeft && iL >= 0) {
      // Check if the left tile is not a cooridor tile.  
      if (p.getTileType(this.r, iL) != TileType.cooridor) {
        // If so, stop iterating.
        searchingLeft = false;
      } else {
        // Otherwise, add left coordinate to the list.
        coordsInView.push(new Coordinate(this.r, iL));
        // Decrement to continue searching.
        iL--;
      }
    }

    // Begin searching right.
    let searchingRight = true;
    // Find first coordinate to the right.
    let iR = this.c + 1;
    // Iterate over all coordinates to the right.
    while (searchingRight && iR < p.getWidth()) {
      // Check if the right tile is not a cooridor tile.  
      if (p.getTileType(this.r, iR) != TileType.cooridor) {
        // If so, stop iterating.
        searchingRight = false;
      } else {
        // Otherwise, add right coordinate to the list.
        coordsInView.push(new Coordinate(this.r, iR));
        // Increment to continue searching.
        iR++;
      }
    }

    // Begin searching above.
    let searchingUp = true;
    // Find first coordinate above.
    let iU = this.r - 1;
    // Iterate over all coordinates above.
    while (searchingUp && iU >= 0) {
      // Check if the above tile is not a cooridor tile.  
      if (p.getTileType(iU, this.c) != TileType.cooridor) {
        // If so, stop iterating.
        searchingUp = false;
      } else {
        // Otherwise, add above coordinate to the list.
        coordsInView.push(new Coordinate(iU, this.c));
        // Decrement to continue searching.
        iU--;
      }
    }

    // Begin searching below.
    let searchingDown = true;
    // Find first coordinate below.
    let iD = this.r + 1;
    // Iterate over all coordinates below.
    while (searchingDown && iD < p.getHeight()) {
      // Check if the below tile is not a cooridor tile.  
      if (p.getTileType(iD, this.c) != TileType.cooridor) {
        // If so, stop iterating.
        searchingDown = false;
      } else {
        // Otherwise, add below coordinate to the list.
        coordsInView.push(new Coordinate(iD, this.c));
        // Increment to continue searching.
        iD++;
      }
    }

    // Return the list of coordinates.
    return coordsInView;
  }
}
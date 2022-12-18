import { Puzzle } from "@prisma/client";
import { TileType } from "../components/Tile";
import Coordinate from "./Coordinate";
import PuzzleWrapper from "./PuzzleWrapper";

/** Class representing the model for an active Akari game. */
export default class GameModel {

  /** Represents the current active puzzle. */
  activePuzzle: PuzzleWrapper;

  /** Holds the coordinates of user-placed lamps. */
  lampList: Coordinate[];

  /**
   * Create a new game.
   * @param puzzle - Puzzle selected to play.
   * @param lampList - Starting state of the lamp list.
   */
  constructor(puzzle: Puzzle, lampList: Coordinate[] = []) {
    this.activePuzzle = new PuzzleWrapper(puzzle);
    this.lampList = lampList;
  }

  /**
   * Adds a lamp to the lamp list.
   * @param r - Row for new lamp.
   * @param c - Column for new lamp.
   */
  addLamp(r: number, c: number) {

    // Throw an error if a lamp cannot be added to the tile.
    if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
      throw new Error("Illegal arguments in addLamp");
    }

    // Checks if `lampList` does not already contain a lamp at the given coordinates. 
    if (this.lampList.findIndex((element) => element.r === r && element.c === c) === -1) {
      // Add new coordinate to the `lampList`.
      this.lampList.push(new Coordinate(r, c));
    }
  }

  /**
   * Removes a lamp from the lamp list.
   * @param r - Row for the lamp to remove.
   * @param c - Column for the lamp to remove.
   */
  removeLamp(r: number, c: number) {

    // Throw an error if the tile should not have a lamp on it.
    if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
      throw new Error("Illegal arguments in removeLamp");
    }

    // Find the location of the lamp to remove.
    let indexOfLamp = this.lampList.findIndex((element) => element.r === r && element.c === c);
    // Checks of `lampList` contains a lamp at the given coordinates.
    if (indexOfLamp !== -1) {
      // Remove the coordiante from `lampList`.
      this.lampList.splice(indexOfLamp, 1);
    }
  }

  /**
   * Checks if a tile at the given coordinates is lit by any lamp on the puzzle.
   * @param r - Row for the tile to check.
   * @param c - Column for the tile to check.
   * @returns `true` if the tile is lit, `false` otherwise.
   */
  isLit(r: number, c: number) {

    // Throw an error if the tile cannot be lit.
    if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
      throw new Error("Illegal argument in isLit");
    }

    // Return `true` if the lampList contains the tile (i.e., the tile is lit).
    if (this.lampList.findIndex((element) => element.r === r && element.c === c) !== -1) {
      return true;
    }

    // Create list to store all lit tiles on the board.
    let allLit: Coordinate[] = [];

    // Iterate over each user-placed lamp.
    this.lampList.forEach(lampCoord => {
      // Add all coordinates lit by each lamp to the list.
      allLit = allLit.concat(lampCoord.getCoordinatesInViewForPuzzle(this.activePuzzle));
    });

    // Return `true` if `allLit` contains the coordinate given, `false` otherwise.
    return allLit.findIndex((element) => element.r === r && element.c === c) !== -1;
  }

  /**
   * Checks if a tile at the given coordinate contains a lamp.
   * @param r - Row for the tile to check.
   * @param c - Column for the tile to check.
   * @returns `true` if there is a lamp at the given coordinates, `false` otherwise.
   */
  isLamp(r: number, c: number) {

    // Throws an error if the tile cannot have a lamp.
    if (this.activePuzzle.getTileType(r, c) != TileType.cooridor) {
      throw new Error("Illegal argument in isLamp");
    }

    // Return `true` if `lampList` contains the coordinates given, `false` otherwise.        
    return this.lampList.findIndex((element) => element.r === r && element.c === c) !== -1;
  }

  /**
   * Checks if a lamp at a given coordinate is illegal
   * (i.e., faces another lamp in any cardinal direction).
   * @param r - Row for the tile to check.
   * @param c - Column for the tile to check.
   * @returns `true` if the lamp is illegally placed, `false` otherwise.
   */
  isLampIllegal(r: number, c: number) {

    // Create a coordinate object for given coordinates.
    let lampCoordinate: Coordinate = new Coordinate(r, c);

    // Throw an error if either the tile cannot have a lamp, or if the tile does not have a lamp. 
    if (this.activePuzzle.getTileType(r, c) != TileType.cooridor
      || this.lampList.findIndex((element) => element.r === r && element.c === c) === -1) {
      throw new Error("Illegal argument in isLampIllegal");
    }

    // Get all coordinates lit by the given lamp.
    let litFromLamp: Coordinate[] = lampCoordinate.getCoordinatesInViewForPuzzle(this.activePuzzle);

    // Initialize a return value.
    let returnValue = false;

    // Iterate over each tile lit from the lamp.
    litFromLamp.forEach(coord => {
      // Check if any tile lit by the lamp is also a lamp.
      if (this.lampList.findIndex((element) => element.r === coord.r && element.c === coord.c) !== -1) {
        // If so, set the return value to true.
        returnValue = true;
      }
    });

    // Check whether the lamp was found to be illegal. 
    if (returnValue) {
      // If so, return true.
      return true;
    }

    // Otherwise, return false.
    return false;
  }

  /**
   * Resets the puzzle (i.e., removes all user-placed lamps).
   */
  resetPuzzle() {
    // Clear the `lampList`.
    this.lampList = [];
  }

  /**
   * Determines whether or not the puzzle has been solved, based on the following:
   * 1. All cooridor tiles are lit.
   * 2. All clue tiles are satisfied.
   * 3. No lamps are illegally placed.
   * @returns `true` if all solve conditions are met for the puzzle, `false` otherwise.
   */
  isSolved() {

    // Iterate over all rows.
    for (let i = 0; i < this.activePuzzle.getHeight(); i++) {
      // Iterate over each column.
      for (let j = 0; j < this.activePuzzle.getWidth(); j++) {

        // Checks if tile is a cooridor tile.
        if (this.activePuzzle.getTileType(i, j) == TileType.cooridor) {
          // Return `false` if any cooridor tile is not lit (condition 1).
          if (!this.isLit(i, j)) {
            return false;
          }
          // Checks if the tile is a clue tile.
        } else if (this.activePuzzle.getTileType(i, j) == TileType.clue) {
          // Return `false` if any clue tile is not satisfied (condition 2).
          if (!this.isClueSatisfied(i, j)) {
            return false;
          }
        }
      }
    }

    // Set the return value to true.
    let returnValue = true;

    // Iterate over each lamp.
    this.lampList.forEach(lampCoord => {
      // Return `false` if any lamp tile is illegal (condition 3).
      if (this.isLampIllegal(lampCoord.r, lampCoord.c)) {
        returnValue = false;
      }
    });

    // If all pass, then the puzzle is solved. Return the return value.
    return returnValue;
  }

  /**
   * Determines whether or not a clue on a clue tile is satisfied
   * (i.e., the correct number of lamps are adjacent to the clue tile).
   * @param r - Row for the tile to check.
   * @param c - Column for the tile to check.
   * @returns `true` if the clue is satisfied, `false` otherwise.
   */
  isClueSatisfied(r: number, c: number) {

    // Throws an error if the tile is not a clue tile.
    if (this.activePuzzle.getTileType(r, c) != TileType.clue) {
      throw new Error("Illegal argument in isClueSatisfied");
    }

    // Create a coordinate object for the current coordinate.
    let currentCoordinate: Coordinate = new Coordinate(r, c);

    // Create a list of all of the adjacent tiles.
    let adjacentCoordinates = currentCoordinate.getAdjacentCoordinatesForPuzzle(this.activePuzzle);

    // Create a counter variable for the number of adjacent lamps.
    let numLamps = 0;

    // Iterate over the adjacent coordinates.
    adjacentCoordinates.forEach(coord => {

      // Check if each adjacent tile contains a lamp.
      if (this.activePuzzle.getTileType(coord.r, coord.c) == TileType.cooridor
        && this.isLamp(coord.r, coord.c)) {
        // If so, iterate the number of lamps counter.
        numLamps++;
      }
    });

    // Return `true` if the number of adjacent lamps matches the clue, and `false` otherwise.
    return numLamps == this.activePuzzle.getClue(r, c);
  }

  /**
   * Finds the appropriate tile style for a given tile.
   * @param r - Row of the tile to check.
   * @param c - Column of the tile to check.
   * @returns the appropriate tile style for the tile.
   */
  tileStyleType(r: number, c: number) {

    // Determine the type of the tile inputted.
    let tileType = this.activePuzzle.getTileType(r, c);

    // Check if the tile is a lamp tile and the game is solved.
    if (tileType == TileType.cooridor && this.isSolved() && this.isLamp(r, c)) {
      // Return the `solvedCooridorLampStyle` style.
      return TileStyleType.solvedCooridorLampStyle;
    }

    // Check if the tile is a cooridor tile and the game is solved.
    if (tileType == TileType.cooridor && this.isSolved()) {
      // Return the `solvedCooridorStyle` style.
      return TileStyleType.solvedCooridorStyle;
    }

    // Check if the tile is a wall tile.
    if (tileType == TileType.wall) {
      // Return the `wallStyle` style.
      return TileStyleType.wallStyle;
    }
    // Check if the tile is a clue tile.
    else if (tileType == TileType.clue) {
      // Check if clue is solved.
      if (this.isClueSatisfied(r, c)) {
        // Return the `satisfiedClueStyle` style.
        return TileStyleType.satisfiedClueStyle;
      }
      else {
        // Otherwise, return the `clueStyle` style.
        return TileStyleType.clueStyle;
      }
    }
    // Determine style for coordinate tile.
    else {
      // Check if the tile is a lamp tile and is illegal.
      if (this.isLamp(r, c) && this.isLampIllegal(r, c)) {
        // Return the `invalidLampStyle` style.
        return TileStyleType.invalidLampStyle;
      }
      // Check if the tile is a lamp tile.
      if (this.isLamp(r, c)) {
        // Return the `lampStyle` style.
        return TileStyleType.lampStyle;
      }
      // Check if tile is lit.
      if (this.isLit(r, c)) {
        // Return the `litStyle` style.
        return TileStyleType.litStyle;
      }
      else {
        // Otherwise, return the `cooridorStyle` style.
        return TileStyleType.cooridorStyle;
      }
    }
  }

  /**
   * Determine the clue text for wall tiles. 
   * @param r - Row for the tile to check. 
   * @param c - Column for the tile to check.
   * @returns the clue text for the given wall tile.
   */
  clueText(r: number, c: number) {

    // Check if the tile is a clue tile.
    if (this.activePuzzle.getTileType(r, c) == TileType.clue) {
      // Return the clue for the clue tile as a string.
      return this.activePuzzle.getClue(r, c).toString();
    }
    // Otherwise, return an empty string.
    else {
      return "";
    }
  }
}

/** Enumeration for the different tile styles. */
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
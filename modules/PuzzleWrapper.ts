import { Puzzle } from "@prisma/client";
import { TileType } from "../components/Tile";

/** Decorator class to add more functionality to a base `Puzzle` model object. */
export default class PuzzleWrapper {

  /** Represents a puzzle board. */
  board: number[][];

  /**
   * Create a PuzzleWrapper object.
   * @param puzzle - Puzzle object to decorate.
   */
  constructor(puzzle: Puzzle) {

    // Create a blank grid.
    let grid: number[][] = [];

    // Split the stringified board layout provided from the database.
    const stringPuzzleLayout = puzzle.boardLayout.split(",");

    // Create an empty list to represent a number version of the string list above.
    const numberPuzzleLayout: number[] = [];

    // Convert the `stringPuzzleLayout` to a list of numbers.
    stringPuzzleLayout.forEach((strElement) => numberPuzzleLayout.push(parseInt(strElement)));

    // Iterate over the `numberPuzzleLayout` object.
    while (numberPuzzleLayout.length) {
      // Splice each row from the `numberPuzzleLayout` object into a proper grid based
      // on the puzzle width.
      grid.push(numberPuzzleLayout.splice(0, puzzle.width));
    }

    // Set the game board as this grid.
    this.board = grid;
  }

  /**
   * Finds the width of the puzzle grid.
   * @returns the number of columns on the puzzle board.
   */
  getWidth() {
    // Returns the number of columns in the board.
    return this.board[0].length;
  }

  /**
   * Finds the height of the puzzle grid.
   * @returns the number of rows on the puzzle board.
   */
  getHeight() {
    // Returns the number of rows in the board.
    return this.board.length;
  }

  /**
   * Gets the type of the given tile based on the key below:
   * 0-4: Clue tile (clue value is == to the grid value.)
   * 5  : Wall tile
   * 6  : Cooridor tile
   * @param r - Row value of the tile to check.
   * @param c - Column value of the tile to check.
   * @returns the type (clue, wall, or cooridor) of the given tile.
   */
  getTileType(r: number, c: number) {

    // Throws an error if the tile of the given coordinates does not exist.
    if (r < 0 || r >= this.getHeight() || c < 0 || c >= this.getWidth()) {
      throw new Error("Invalid tile lookup")
    }

    // Checks if the value on the grid is <=4.
    if (this.board[r][c] >= 0 && this.board[r][c] <= 4) {
      // Return the `clue` type.
      return TileType.clue;
      // Checks if the value on the grid is ==5.
    } else if (this.board[r][c] == 5) {
      // Return the `wall` type.
      return TileType.wall;
      // Otherwise,
    } else {
      // Return the `cooridor` type.
      return TileType.cooridor;
    }
  }

  /**
   * Finds the clue value for a given clue tile.
   * @param r - Row value for the tile to check.
   * @param c - Column value for the tile to check.
   * @returns the clue value for the tile.
   */
  getClue(r: number, c: number) {

    // Throws an error if the tile of the given coordinates does not exist.
    if (r < 0 || r >= this.getHeight() || c < 0 || c >= this.getWidth()) {
      throw new Error("Invalid tile lookup");
    }
    // Throws an error if the given tile is not a clue tile.
    if (this.getTileType(r, c) != TileType.clue) {
      throw new Error("Tried to get clue for non-clue tile")
    }

    // Returns the clue value for the coordinates.
    return this.board[r][c];
  }
}
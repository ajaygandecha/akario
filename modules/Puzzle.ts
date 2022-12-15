import { TileType } from "../components/Tile";

export default class Puzzle {

    board: number[][];

    constructor(board: number[][]) {
        this.board = board;
    }

    getWidth() {
        return this.board[0].length;
    }

    getHeight() {
        return this.board.length;
    }

    getTileType(r: number, c: number) {

        if (r < 0 || r >= this.getHeight() || c < 0 || c >= this.getWidth()) {
            throw new Error("Invalid tile lookup")
          }
      
          if (this.board[r][c] >= 0 && this.board[r][c] <= 4) {
            return TileType.clue;
          } else if (this.board[r][c] == 5) {
            return TileType.wall;
          } else {
            return TileType.cooridor;
        }
    }

    getClue(r: number, c: number) {

        if (r < 0 || r >= this.getHeight() || c < 0 || c >= this.getWidth()) {
            throw new Error("Invalid tile lookup");
        }
        if (this.getTileType(r, c) != TileType.clue) {
          throw new Error("Tried to get clue for non-clue tile")
        }
    
        return this.board[r][c];
      }
  
}
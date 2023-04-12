import { Injectable } from '@angular/core';

export interface BoardState {
  board: number[][];
  placeable: number[][];
}

export type Coordinate = { row: number; column: number };
export type Label = `${'a|b|c|d|e|f|g|h'}${number}` | '--';
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  readonly DIRECTION = [
    [-1, -1],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  init(): BoardState {
    const board: number[][] = Array.from({ length: 10 }).map((_, r) =>
      Array.from({ length: 10 }).map((_, c) => {
        if (r === 0 || r === 9 || c === 0 || c === 9) return -1;
        if ((r === 4 && c === 5) || (r === 5 && c === 4)) return 1;
        if ((r === 4 && c === 4) || (r === 5 && c === 5)) return 2;
        return 0;
      })
    );

    const { placeable } = this.updatePlaceble(board, 1);

    return {
      board,
      placeable,
    };
  }

  place(board: number[][], positoin: Coordinate, currentPlayer: number): number[][] {
    const { row, column } = positoin;
    board[row][column] = currentPlayer;
    for (const [dr, dc] of this.DIRECTION) {
      let cr = row + dr;
      let cc = column + dc;
      if (board[cr][cc] !== 3 - currentPlayer) continue;
      const candidate = [];
      while (board[cr][cc] === 3 - currentPlayer) {
        candidate.push([cr, cc]);
        cr += dr;
        cc += dc;
      }
      if (board[cr][cc] === currentPlayer) {
        for (const [r, c] of candidate) {
          board[r][c] = currentPlayer;
        }
      }
    }
    return board;
  }

  updatePlaceble(
    board: number[][],
    currentPlayer: number
  ): { placeable: number[][]; canMove: boolean } {
    const placeable: number[][] = Array.from({ length: 10 }).map((_) =>
      Array.from({ length: 10 }).map((_) => 0)
    );
    let canMove = false;
    for (let r = 1; r < 9; r++) {
      for (let c = 1; c < 9; c++) {
        if (board[r][c] !== 0) continue;
        for (const [dr, dc] of this.DIRECTION) {
          let cr = r + dr;
          let cc = c + dc;
          if (board[cr][cc] !== 3 - currentPlayer) continue;
          while (board[cr][cc] === 3 - currentPlayer) {
            cr += dr;
            cc += dc;
          }
          if (board[cr][cc] === currentPlayer) {
            placeable[r][c] = 1;
            canMove = true;
          }
        }
      }
    }
    return {
      placeable,
      canMove,
    };
  }
}

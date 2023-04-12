import { Injectable } from '@angular/core';

type BoardState = number[][];
export interface Board {
  boardState: BoardState;
  currentPlayer: number;
  history: string[];
}

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

  init(): Board {
    let boardState: BoardState = Array.from({ length: 10 }).map((_, r) =>
      Array.from({ length: 10 }).map((_, c) => {
        if (r === 0 || r === 9 || c === 0 || c === 9) return -1;
        if ((r === 4 && c === 5) || (r === 5 && c === 4)) return 1;
        if ((r === 4 && c === 4) || (r === 5 && c === 5)) return 2;
        return 0;
      })
    );

    boardState = this._updatePlaceableCell(boardState, 1);

    return {
      boardState,
      currentPlayer: 1,
      history: [],
    };
  }

  place(board: Board, row: number, column: number): Board {
    if (board.boardState[row][column] !== 3) return board;
    board.history.push(this._coordinateToLabel(row, column));
    board.boardState[row][column] = board.currentPlayer;
    board.boardState = this._flip(board.boardState, row, column);
    board.currentPlayer = this._changePlayer(board.currentPlayer);
    board.boardState = this._updatePlaceableCell(board.boardState, board.currentPlayer);
    return board;
  }

  private _flip(boardState: BoardState, row: number, column: number): BoardState {
    const currentPlayer = boardState[row][column];
    for (const [dr, dc] of this.DIRECTION) {
      let cr = row + dr;
      let cc = column + dc;
      if (boardState[cr][cc] !== 3 - currentPlayer) continue;
      const candidate = [];
      while (boardState[cr][cc] === 3 - currentPlayer) {
        candidate.push([cr, cc]);
        cr += dr;
        cc += dc;
      }
      if (boardState[cr][cc] === currentPlayer) {
        for (const [r, c] of candidate) {
          boardState[r][c] = currentPlayer;
        }
      }
    }
    return boardState;
  }

  private _changePlayer(currentPlayer: number): number {
    return 3 - currentPlayer;
  }

  private _findPlacebleCell(boardState: BoardState, currentPlayer: number): number[][] {
    const candidate = [];
    for (let r = 1; r < 9; r++) {
      for (let c = 1; c < 9; c++) {
        if (boardState[r][c] !== 0) continue;
        for (const [dr, dc] of this.DIRECTION) {
          let cr = r + dr;
          let cc = c + dc;
          if (boardState[cr][cc] !== 3 - currentPlayer) continue;
          while (boardState[cr][cc] === 3 - currentPlayer) {
            cr += dr;
            cc += dc;
          }
          if (boardState[cr][cc] === currentPlayer) {
            candidate.push([r, c]);
          }
        }
      }
    }
    return candidate;
  }

  private _updatePlaceableCell(boardState: BoardState, currentPlayer: number): BoardState {
    const candidate = this._findPlacebleCell(boardState, currentPlayer);
    for (let r = 1; r < 9; r++) {
      for (let c = 1; c < 9; c++) {
        if (boardState[r][c] === 3) {
          boardState[r][c] = 0;
        }
      }
    }
    for (const [r, c] of candidate) {
      boardState[r][c] = 3;
    }
    return boardState;
  }

  private _coordinateToLabel(row: number, column: number) {
    return `${'abcdefgh'[row]}${column + 1}`;
  }
}

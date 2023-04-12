import { Injectable } from '@angular/core';

export interface Board {
  boardState: number[][];
  currentPlayer: number;
  history: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  init(): Board {
    const boardState = Array.from({ length: 8 }).map((_) =>
      Array.from({ length: 8 }).map((_) => 0)
    );
    boardState[3][3] = 2;
    boardState[3][4] = 1;
    boardState[4][3] = 1;
    boardState[4][4] = 2;
    return {
      boardState,
      currentPlayer: 1,
      history: [],
    };
  }
}

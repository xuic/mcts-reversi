import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { BoardState, BoardService, Coordinate } from './board.service';

export interface Game {
  boardState: BoardState;
  currentPlayer: number;
  history: string[];
  isGameOver: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game$ = new ReplaySubject<Game>();

  constructor(private boardService: BoardService) {}

  init(): void {
    const boardState: BoardState = this.boardService.init();
    this.game$.next({
      boardState,
      currentPlayer: 1,
      history: [],
      isGameOver: false,
    });
  }

  place(game: Game, coordinate: Coordinate): void {
    const board = this.boardService.place(game.boardState.board, coordinate, game.currentPlayer);
    game.history.push(this.coordinateToLabel(coordinate));
    const { placeable, canMove } = this.boardService.updatePlaceble(board, 3 - game.currentPlayer);
    if (canMove) {
      this.game$.next({
        boardState: {
          board,
          placeable,
        },
        currentPlayer: 3 - game.currentPlayer,
        history: game.history,
        isGameOver: false,
      });
    } else {
      const { placeable, canMove } = this.boardService.updatePlaceble(board, game.currentPlayer);
      if (canMove) {
        this.game$.next({
          boardState: {
            board,
            placeable,
          },
          currentPlayer: game.currentPlayer,
          history: [...game.history, '--'],
          isGameOver: false,
        });
      } else {
        this.game$.next({
          boardState: {
            board,
            placeable,
          },
          currentPlayer: 3 - game.currentPlayer,
          history: game.history,
          isGameOver: true,
        });
      }
    }
  }

  private coordinateToLabel(coordinate: Coordinate) {
    return `${'abcdefgh'[coordinate.row - 1]}${coordinate.column}`;
  }
}

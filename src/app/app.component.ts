import { Component, OnInit } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { Game, GameService } from './service/game.service';
import { HistoryComponent } from './history/history.component';
import { Coordinate } from './service/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, BoardComponent, HistoryComponent],
})
export class AppComponent implements OnInit {
  title = 'mcts-reversi';
  game!: Game;

  constructor(private gameService: GameService) {}

  onPlace(coordinate: Coordinate): void {
    this.gameService.place(this.game, coordinate);
  }

  ngOnInit(): void {
    this.gameService.init();
    this.gameService.game$.subscribe((game) => {
      this.game = game;
    });
  }
}

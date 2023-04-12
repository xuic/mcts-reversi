import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board, BoardService } from '../service/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board!: Board;
  constructor(private boardService: BoardService) {}

  place(e: MouseEvent, r: number, c: number): void {
    e.stopPropagation();
    this.board = this.boardService.place(this.board, r, c);
  }

  ngOnInit(): void {
    this.board = this.boardService.init();
  }
}

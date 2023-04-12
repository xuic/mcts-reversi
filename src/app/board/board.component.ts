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
  ngOnInit(): void {
    this.board = this.boardService.init();
  }
}

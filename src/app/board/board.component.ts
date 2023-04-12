import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardState, BoardService, Coordinate } from '../service/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() boardState!: BoardState;
  @Output() place = new EventEmitter<Coordinate>();
  constructor(private boardService: BoardService) {}

  onPlace(e: MouseEvent, r: number, c: number): void {
    e.stopPropagation();
    if (this.boardState.placeable[r][c]) {
      this.place.emit({ row: r, column: c });
    }
  }
}

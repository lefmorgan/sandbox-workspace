import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BoardgamesService } from '../../services/boardgames.service';
import { TableBoardgamesComponent } from '../table-boardgames/table-boardgames.component';

@Component({
  selector: 'mbg-list-boardgames',
  standalone: true,
  imports: [TableBoardgamesComponent],
  templateUrl: './list-boardgames.component.html',
  styleUrl: './list-boardgames.component.scss'
})
export class ListBoardgamesComponent {
  private readonly service = inject(BoardgamesService);
  boardgame$ = this.service.getAll();
  boardgame$$ = toSignal(this.boardgame$)

}

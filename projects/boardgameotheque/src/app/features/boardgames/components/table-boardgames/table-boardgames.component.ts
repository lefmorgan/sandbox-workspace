import { Component, input } from '@angular/core';
import { Boardgame } from '../../models/boardgame';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'mbg-table-boardgames',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table-boardgames.component.html',
  styleUrl: './table-boardgames.component.scss'
})
export class TableBoardgamesComponent {
  items = input.required<Boardgame[]>();
  title = input<string>('');
}

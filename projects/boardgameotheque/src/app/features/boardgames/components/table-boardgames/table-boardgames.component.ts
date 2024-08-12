import { Component, input, WritableSignal } from '@angular/core';
import { Boardgame } from '../../models/boardgame';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mbg-table-boardgames',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './table-boardgames.component.html',
  styleUrl: './table-boardgames.component.scss'
})
export class TableBoardgamesComponent {
  items = input.required<Boardgame[]>();
  title = input<string>('');

  displayedColumns: string[] = ['position', 'thumbnail', 'name', 'yearPublished'];

  dataSource = new MatTableDataSource<Boardgame>();

  ngAfterViewInit() {
    setInterval(() => {
      this.dataSource.data = this.items();
    }, 1000);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, effect, input, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule]
@Component({
  selector: 'mbg-table',
  standalone: true,
  imports: [MATERIAL_MODULES, FilterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements OnInit {

  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input.required<string[]>();

  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  constructor() {
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }

      if (this.data()) {
        this.dataSource.data = this.data();
      }
    }, {allowSignalWrites: true})
   }
   
  ngOnInit(): void {
    this.dataSource.data = this.data()
    this.dataSource.sort = this._sort()
    this.dataSource.paginator = this._paginator()
  }

  openEditForm() {}
  deleteContact() {}
}

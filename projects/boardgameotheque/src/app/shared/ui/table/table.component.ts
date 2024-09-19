import { Component, effect, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONST } from '../../../core/constantes';
import { BoardgamesService } from '../../../features/boardgames/services/boardgames.service';
import { ModalService } from '../modal/modal.service';
import { ModalComponent } from '../modal/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../services/snack-bar.service';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule,]
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
  private readonly _boardgamesService = inject(BoardgamesService);
  private readonly _modalService = inject(ModalService);
  private readonly _snackBarService = inject(SnackBarService);


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

  openEditForm(data: T): void {
    this._modalService.openModal<ModalComponent, T>(ModalComponent, data, true);
  }
  deleteContact(id: string): void {
    const confirmation = confirm(APP_CONST.MESSAGES.BOARDGAME_PROMPT);
    
    if (confirmation) {
      this._boardgamesService.deleteBoardGame(id);
      this._snackBarService.showSnackBar(APP_CONST.MESSAGES.BOARDGAME_DELETED);

    }
  }
}

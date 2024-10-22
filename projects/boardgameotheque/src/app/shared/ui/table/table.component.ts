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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs';

export interface DataService<T> {
  deleteItem(id: string): Observable<void>;
  updateItem(id: string, item: T): Observable<void>;
}
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

  dataService = input.required<DataService<T>>();
  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');


  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _boardgamesService = inject(BoardgamesService);
  private readonly _modalService = inject(ModalService);
  private readonly _snackBarService = inject(SnackBarService);
  private readonly _dialog = inject(MatDialog)

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

  selectedRow(data: T): void {
    this.openEditForm(data);
  }

  delete(id: string): void {
    const dialogRef = this._dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      },
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dataService().deleteItem(id);
        this._snackBarService.showSnackBar(APP_CONST.MESSAGES.BOARDGAME_DELETED);
      }
    });
  }
}

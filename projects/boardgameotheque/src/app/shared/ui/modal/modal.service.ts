import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Boardgame } from '../../../features/boardgames/models/boardgame';



@Injectable({providedIn: 'root'})
export class ModalService {
  
  private readonly _dialog = inject(MatDialog);

  openModal<CT, T = Boardgame>(componentRef: ComponentType<CT>, data?: T, isEditing = false ): void {
    const config = { data, isEditing };

    this._dialog.open(componentRef, {
      data: config,
      width : '600px'
    } );
  }


  closeModal(): void{
    this._dialog.closeAll();
  }
  
}
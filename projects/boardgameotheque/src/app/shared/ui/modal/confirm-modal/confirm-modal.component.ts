import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mbg-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  private readonly _dialogRef = inject(MatDialogRef<ConfirmModalComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this._dialogRef.close(true); 
  }

  onCancel(): void {
    this._dialogRef.close(false);
  }
}

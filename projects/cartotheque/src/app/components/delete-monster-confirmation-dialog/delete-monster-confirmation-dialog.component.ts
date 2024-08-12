import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'mco-delete-monster-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './delete-monster-confirmation-dialog.component.html',
  styleUrl: './delete-monster-confirmation-dialog.component.scss'
})
export class DeleteMonsterConfirmationDialogComponent {

}

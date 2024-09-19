import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BoardgamesService } from '../../../../features/boardgames/services/boardgames.service';
import { ModalService } from '../modal.service';
import { APP_CONST } from '../../../../core/constantes';
import { SnackBarService } from '../../../services/snack-bar.service';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule]

@Component({
  selector: 'mbg-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  boardgameForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _boardgamesService = inject(BoardgamesService);
  private readonly _modalService = inject(ModalService);
  private readonly _snackBarService = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    this.boardgameForm.patchValue(this._matDialog.data);
  }


  async onSubmit() {
    let message = APP_CONST.MESSAGES.BOARDGAME_UPDATED;
    const boardgame = this.boardgameForm.value;
 
    if (this._matDialog.data) {
      this._boardgamesService.updateBoardGame(this._matDialog.data.id, boardgame);
    } else {
      await this._boardgamesService.newBoardgame(boardgame);
      message = APP_CONST.MESSAGES.BOARDGAME_ADDED;
    }
    this._snackBarService.showSnackBar(message);
    this._modalService.closeModal();
  }

  getTitle(): string {
    return this._matDialog.data ? 'Modifier le jeu de société' : 'Ajouter un jeu de société';
  }


  private _buildForm(): void {
    this.boardgameForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      thumbnail: ['', Validators.required],
      yearPublished: ['', Validators.required]
    });
  }

}
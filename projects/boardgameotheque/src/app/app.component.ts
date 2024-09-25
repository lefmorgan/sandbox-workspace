import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/ui/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { ModalService } from './shared/ui/modal/modal.service';
import { ModalComponent } from './shared/ui/modal/modal/modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

const MATERIAL_MODULES = [MatCardModule, MatProgressSpinnerModule] 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  private readonly _modalService = inject(ModalService)

  onClickNewBoardgame(): void {
    this._modalService.openModal<ModalComponent>(ModalComponent);
  }
}

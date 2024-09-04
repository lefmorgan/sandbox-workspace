import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule]
@Component({
  selector: 'mbg-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  onNewBoardgameEvent = output<void>();
  emitClick(): void {
    this.onNewBoardgameEvent.emit();
  }
}

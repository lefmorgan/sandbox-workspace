import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule]
@Component({
  selector: 'mbg-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  private readonly router = inject(Router)
  
  onNewBoardgameEvent = output<void>();

  goToUrl(url: string): void {
    this.router.navigate([url])
  }

  emitClick(): void {
    this.onNewBoardgameEvent.emit();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/ui/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatCardModule] 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'boardgameotheque';

  onClickNewBoardgame(): void {
    console.log('New boardgame')
  }
}

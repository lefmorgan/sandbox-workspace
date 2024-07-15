import { Component } from '@angular/core';
import { ListBoardgamesComponent } from '../../features/boardgames/components/list-boardgames/list-boardgames.component';

@Component({
  selector: 'mbg-home',
  standalone: true,
  imports: [ListBoardgamesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

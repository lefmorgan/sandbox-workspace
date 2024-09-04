import { Routes } from '@angular/router';

export const boardgameRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list-boardgames/list-boardgames.component').then(
        (m) => m.ListBoardgamesComponent
      ),
  },
];

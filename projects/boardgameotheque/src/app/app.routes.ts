import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(item => item.HomeComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(item => item.DashboardComponent),
    },
    {
        path: 'boardgames',
        loadChildren: () => import('./features/boardgames/boardgames.routes').then(item => item.boardgameRoute),
    },
    {
        path: '**',
        redirectTo: 'pages/not-found/NotFound.component',
        pathMatch: 'full'
    }
];
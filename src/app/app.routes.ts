import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // Look here
        loadComponent: () => import('./features/tasks/pages/pages').then(m => m.Pages)
    }
];

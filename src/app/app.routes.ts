import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule) },

  // { path: 'rating', loadChildren: () => import().then(m => m) }
  // { path: 'projects', loadChildren: () => import().then(m => m) }
  // { path: 'events', loadChildren: () => import().then(m => m) }
  // { path: 'company', loadChildren: () => import().then(m => m) }
];

import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'navbar', loadChildren: () => import('./layout/navbar/navbar.module').then(m => m.NavbarModule) },

  // { path: 'rating', loadChildren: () => import().then(m => m) }
  // { path: 'projects', loadChildren: () => import().then(m => m) }
  // { path: 'events', loadChildren: () => import().then(m => m) }
  // { path: 'company', loadChildren: () => import().then(m => m) }
];

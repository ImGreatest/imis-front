import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'navbar', loadChildren: () => import('./layout/navbar/navbar.module').then(m => m.NavbarModule) },
  { path: 'rating', loadChildren: () => import('./pages/rating/rating.module').then(m => m.RatingModule) },
  { path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },
  // { path: 'events', loadChildren: () => import().then(m => m) }
  // { path: 'company', loadChildren: () => import().then(m => m) }
];

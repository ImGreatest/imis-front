import { Routes } from '@angular/router';
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {Error404Component} from "./pages/error-404/error-404.component";



export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule),
      },
      {
        path: 'rating',
        loadChildren: () => import('./pages/rating/rating.module').then(m => m.RatingModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'events',
        loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'company',
        loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
      }
    ],
  },
  // {
  //   path: 'auth',
  //   //loadChildren: () => import().then(m => m)
  // },
  {
    path: '**',
    component: Error404Component,
  },
];

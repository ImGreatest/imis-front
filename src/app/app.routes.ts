import { Routes } from '@angular/router';
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {Error404Component} from "./pages/error-404/error-404.component";
import {AuthModule} from "./pages/auth/auth.module";



export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () => import('./pages/overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'rating',
        loadChildren: () => import('./pages/rating/rating.module').then((m) => m.RatingModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'events',
        loadChildren: () => import('./pages/events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'company',
        loadChildren: () => import('./pages/company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
      },
      {
        path: 'math-models',
        loadChildren: () => import('./pages/math-model-table/math-models-table.module').then((m) => m.MathModelsTableModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./pages/roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '**',
    component: Error404Component,
  },
];

import { Routes } from '@angular/router';
import { ErrorComponent } from "../app/pages/error-404/error.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";

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
        path: 'notice',
        loadChildren: () => import('./pages/notice/notice.module').then((m) => m.NoticeModule),
      },
      {
        path: 'skills',
        loadChildren: () => import('./pages/skills/skills.page.module').then((m) => m.SkillsPageModule),
      },
      
      {
        path: 'success',
        loadChildren: () => import('./pages/success/success-page.module').then((m) => m.SuccessPageModule),
      },
      {
        path: 'math-models',
        loadChildren: () => import('./pages/math-model-table/math-models-table.module').then((m) => m.MathModelsTableModule),
      },
      {
        path: 'math-models/:id',
        loadChildren: () => import('./pages/create-rating/create-rating.module').then((m) => m.CreateRatingModule)
      },{
        path: 'math-models/create',
        loadChildren: () => import('./pages/create-rating/create-rating.module').then((m) => m.CreateRatingModule)
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
    children: [
      {
        path: 'login',
        loadChildren: () => import('src/app/pages/authorisation/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'reset',
        loadChildren: () => import('src/app/pages/authorisation/recover/recover.module').then(m => m.RecoverModule),
      },
      {
        path: 'new-password',
        loadChildren: () => import('src/app/pages/authorisation/new-password/new-password.module').then(m => m.NewPasswordModule),
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

import { Routes } from '@angular/router';
import { ErrorComponent } from "./pages/error-404/error.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProfileComponent } from "./layout/profile/profile.component";
import { UserProfileComponent } from "./pages/user/user-profile/user-profile.component";
import { UserProjectsComponent } from "./pages/user/projects/projects.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { EventsComponent } from "./pages/user/events/events.component";
import { NotificationComponent } from "./pages/user/notification/notification.component";
import { FavoriteProjectsComponent } from "./pages/user/favorite/favorite-projects/favorite-projects.component";
import { FavoriteEventsComponent } from "./pages/user/favorite/favorite-events/favorite-events.component";
import { FavoriteUsersComponent } from "./pages/user/favorite/favorite-users/favorite-users.component";
import { FavoriteCompanyComponent } from "./pages/user/favorite/favorite-company/favorite-company.component";
import { AuthComponent } from "./pages/authorisation/auth/auth.component";
import { ConfirmComponent } from "./pages/authorisation/confirm/confirm.component";
import { NewPasswordComponent } from "./pages/authorisation/new-password/new-password.component";
import { RecoverComponent } from "./pages/authorisation/recover/recover.component";
import { ChangeEmailComponent } from "./pages/user/user-profile/change-email/change-email.component";
import { MainComponent } from "./pages/user/user-profile/main/main.component";
import { ChangePasswordComponent } from "./pages/user/user-profile/change-password/change-password.component";
import { RolesComponent } from "./pages/roles/roles.component";
import { CompanyComponent } from "./pages/company/company.component";
import { CreateRatingComponent } from "./pages/create-rating/create-rating.component";
import { OverviewComponent } from "./pages/overview/overview.component";
import { RatingComponent } from "./pages/rating/rating.component";
import { MathModelsTableComponent } from "./pages/math-model-table/math-models-table.component";
import { SkillsPageComponent } from "./pages/skills/skill.page.component";
import { SuccessPageComponent } from "./pages/success/success-page.component";

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
        component: OverviewComponent,
      },
      {
        path: 'rating',
        component: RatingComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'skills',
        component: SkillsPageComponent,
      },
      {
        path: 'success',
        component: SuccessPageComponent,
      },
      {
        path: 'math-models',
        component: MathModelsTableComponent,
      },
      {
        path: 'math-models/:id',
        component: CreateRatingComponent,
      },
      {
        path: 'math-models/create',
        component: CreateRatingComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
    ],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'user',
    component: ProfileComponent,
    children: [
      {
        path: 'user',
        redirectTo: '/profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        children: [
          {
            path: 'profile',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: MainComponent,
          },
          {
            path: 'change-email',
            component: ChangeEmailComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
        ],
      },
      {
        path: 'favorite',
        children: [
          {
            path: 'favorite',
            redirectTo: '/projects',
            pathMatch: 'full'
          },
          {
            path: 'projects',
            component: FavoriteProjectsComponent,
          },
          {
            path: 'events',
            component: FavoriteEventsComponent,
          },
          {
            path: 'users',
            component: FavoriteUsersComponent,
          },
          {
            path: 'companies',
            component: FavoriteCompanyComponent,
          },
          {
            path: '**',
            redirectTo: 'projects'
          }
        ],
      },
      {
        path: 'projects',
        component: UserProjectsComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'notifications',
        component: NotificationComponent,
      },
      {
        path: '**',
        redirectTo: '/profile'
      }
    ],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path: 'reset',
        component: RecoverComponent
      },
      {
        path: 'new-password',
        component: NewPasswordComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

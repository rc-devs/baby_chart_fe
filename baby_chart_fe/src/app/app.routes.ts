import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { noAuthGuard } from '../shared/guards/no-auth.guard';

export const routes: Routes = [
  
  {path: '', redirectTo: '/login', pathMatch: 'full' }, // set as dashboard when auth guards set
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then((c) => c.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./core/sign-up/sign-up.component').then((c) => c.SignUpComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent), 
    canActivate: [authGuard],
    children: [
      {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile.component').then((c) => c.UserProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'edit-user',
        loadComponent: () => import('./features/user-profile/edit-user/edit-user.component').then((c) => c.EditUserComponent),
        canActivate: [authGuard]
      },
      {
        path: 'children',
        loadComponent: () => import('./features/children/children.component').then((c) => c.ChildrenComponent),
        canActivate: [authGuard],
        children: [
           {
        path: 'add-child',
        loadComponent: () => import('./features/children/add-child/add-child.component').then((c) => c.AddChildComponent),
        canActivate: [authGuard],
          },
          {
        path: 'child-card',
        loadComponent: () => import('./features/children/child-card/child-card.component').then((c) => c.ChildCardComponent),
        canActivate: [authGuard],
        children: [
              {
            path: 'chart',
            loadComponent: () => import('./features/children/child-card/chart/chart.component').then((c) => c.ChartComponent),
            canActivate: [authGuard]
              }
            ]
          }
        ]
      }
    ]

  }
];

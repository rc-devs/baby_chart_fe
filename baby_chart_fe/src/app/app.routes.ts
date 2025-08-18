import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {path: '', redirectTo: '/login', pathMatch: 'full' }, // set as dashboard when auth guards set
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./core/sign-up/sign-up.component').then((c) => c.SignUpComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent), 
    children: [
      {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile.component').then((c) => c.UserProfileComponent),
      },
      {
        path: 'edit-user',
        loadComponent: () => import('./features/edit-user/edit-user.component').then((c) => c.EditUserComponent),
      },
      {
        path: 'children',
        loadComponent: () => import('./features/children/children.component').then((c) => c.ChildrenComponent),
        children: [
           {
        path: 'add-child',
        loadComponent: () => import('./features/children/add-child/add-child.component').then((c) => c.AddChildComponent),
          },
          {
        path: 'child-card',
        loadComponent: () => import('./features/children/child-card/child-card.component').then((c) => c.ChildCardComponent),
          }
        ]
      }
    ]

  }
];

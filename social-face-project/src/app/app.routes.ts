import { AppComponent } from './app.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        loadChildren: () => [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                path: 'login',
                pathMatch: 'full',
                loadComponent: () => import('./login-module/login-form/login-form.component').then(c => c.LoginFormComponent),
            },
            {
                path: 'register-user',
                pathMatch: 'full',
                loadComponent: () => import('./login-module/create-user/create-user.component').then(c => c.CreateUserComponent),
            },
            {
                path: 'forgot-password',
                pathMatch: 'full',
                loadComponent: () => import('./login-module/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
            }
        ]
    },
];

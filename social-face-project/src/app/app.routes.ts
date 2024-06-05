import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { authUserGuard } from '../shared/guards/auth-user.guard';

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
        ],
    },
    {
        path: 'feed',
        canActivate: [authUserGuard],
        loadComponent: () => import('./feed/feed.component').then(c => c.FeedComponent),
        loadChildren: () => [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'posts',
            },
            {
                path: 'posts',
                pathMatch: 'full',
                loadComponent: () => import('./feed/posts/posts.component').then(c => c.PostsComponent),
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];

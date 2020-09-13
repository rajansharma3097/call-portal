import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { AuthGuardService } from '../core/auth/auth-guard.service';
export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

            { path: '', redirectTo: 'company', pathMatch: 'full' },
            { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) }
        ],
        canActivate: [ AuthGuardService ]
    },

    // Not lazy-loaded routes
    { path: 'login',    component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover',  component: RecoverComponent },

    // Not found
    { path: '**', redirectTo: 'login' }

];

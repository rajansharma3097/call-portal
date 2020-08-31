import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component'; 

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        RecoverComponent
    ],
    exports: [
        RouterModule,
        LoginComponent,
        RegisterComponent,
        RecoverComponent
    ]
})
export class PagesModule { }
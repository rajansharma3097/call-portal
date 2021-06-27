import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';
const routes: Routes = [
  { path: '', redirectTo: 'user' },
  { path: 'settings', component: SettingsComponent },
  { path: 'change-passowrd', component: ChangePasswordComponent },
  { path: 'account', component: AccountComponent },
 
];

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    AccountComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }

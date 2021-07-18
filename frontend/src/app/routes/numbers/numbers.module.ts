import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NumbersRoutingModule } from './numbers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNumberComponent } from './add-number/add-number.component';
import { NumberListComponent } from './number-list/number-list.component';
import { EditNumberComponent } from './edit-number/edit-number.component';
const routes: Routes = [
  { path: '', redirectTo: 'number' },
  { path: 'number-list', component: NumberListComponent },
  { path: 'add-number', component: AddNumberComponent },
  { path: 'edit-number', component:     EditNumberComponent
},
 
];

@NgModule({
  declarations: [
    AddNumberComponent,
    NumberListComponent,
    EditNumberComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NumbersModule { }

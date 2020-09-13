import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: CompanyComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [CompanyComponent],
    exports: [
        RouterModule
    ]
})
export class CompanyModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { CommonModule } from '@angular/common';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';

const routes: Routes = [
  { path: '', redirectTo: 'company' },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company/:id', component: AddCompanyComponent },
  { path: 'campaign-list', component: CampaignListComponent },
  { path: 'edit-campaign/:id', component: EditCampaignComponent },
  { path: 'add-campaign', component: AddCampaignComponent },
]

@NgModule({
  declarations: [
    AddCompanyComponent,
    CompanyListComponent,
    CampaignListComponent,
    EditCampaignComponent,
    AddCampaignComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule { }

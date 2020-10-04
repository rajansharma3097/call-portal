import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { Routes, RouterModule } from '@angular/router';
import { AudioListComponent } from './audio-list/audio-list.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EditEmailTemplateComponent } from './edit-email-template/edit-email-template.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddSourceComponent } from './add-source/add-source.component';
import { SourceListComponent } from './source-list/source-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  { path: 'upload-audio', component: UploadAudioComponent },
  { path: 'audio-list', component: AudioListComponent },
  { path: 'email-template-list', component: EmailTemplateListComponent },
  { path: 'edit-email-template/:id', component: EditEmailTemplateComponent },
  { path: 'add-source', component: AddSourceComponent },
  { path: 'edit-source/:id', component: AddSourceComponent },
  { path: 'source-list', component: SourceListComponent },
];

@NgModule({
  declarations: [UploadAudioComponent, AudioListComponent, AddSourceComponent, SourceListComponent,EmailTemplateListComponent],
  imports: [
    SharedModule,
    EditorModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }

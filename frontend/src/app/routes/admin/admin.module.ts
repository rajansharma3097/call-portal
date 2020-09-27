import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { Routes, RouterModule } from '@angular/router';
import { AudioListComponent } from './audio-list/audio-list.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EditEmailTemplateComponent } from './edit-email-template/edit-email-template.component';
import { EditorModule } from '@tinymce/tinymce-angular';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  { path: 'upload-audio', component: UploadAudioComponent },
  { path: 'audio-list', component: AudioListComponent },
  { path: 'email-template-list', component: EmailTemplateListComponent },
  { path: 'edit-email-template/:id', component: EditEmailTemplateComponent },
];

@NgModule({
  declarations: [UploadAudioComponent, AudioListComponent, EmailTemplateListComponent, EditEmailTemplateComponent],
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

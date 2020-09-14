import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { Routes, RouterModule } from '@angular/router';
import { AudioListComponent } from './audio-list/audio-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  { path: 'upload-audio', component: UploadAudioComponent },
  { path: 'audio-list', component: AudioListComponent },
];

@NgModule({
  declarations: [UploadAudioComponent, AudioListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { Routes, RouterModule } from '@angular/router';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AddSourceComponent } from './add-source/add-source.component';
import { SourceListComponent } from './source-list/source-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  { path: 'upload-audio', component: UploadAudioComponent },
  { path: 'audio-list', component: AudioListComponent },
  { path: 'add-source', component: AddSourceComponent },
  { path: 'edit-source/:id', component: AddSourceComponent },
  { path: 'source-list', component: SourceListComponent },
];

@NgModule({
  declarations: [UploadAudioComponent, AudioListComponent, AddSourceComponent, SourceListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }

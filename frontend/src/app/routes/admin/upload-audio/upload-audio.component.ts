import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const swal = require('sweetalert');
const ONE_MB_SIZE: number = 1048576;

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.scss']
})

export class UploadAudioComponent implements OnInit {


  myForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    file: new FormControl(null, [Validators.required]),
    fileSource: new FormControl(null, [Validators.required])
  });

  constructor(public adminService: AdminService,
              private toastr: ToastrService,
              private router: Router
    ) { }

  get f(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      if( file.size > ONE_MB_SIZE )
      {
        // alert("File Size must not be greater than 1 MB.");
        swal("File Size must not be greater than 1 MB.");
        this.myForm.patchValue({
          file: null
        });
        return false;
      }

      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit($ev, value: any){
    $ev.preventDefault();
    for (let c in this.myForm.controls) {
        this.myForm.controls[c].markAsTouched();
    }
    if (this.myForm.valid) {
        console.log('Valid!');
        console.log(value);
      const formData: FormData = new FormData();
      console.log(value.fileSource);
      formData.append('file', value.fileSource);
      formData.append('audio_name', value.name);
      console.log(formData);
      this.adminService.uploadAudio(formData)
          .subscribe(res => {
            if(res.code == 1) {
              this.toastr.success("File Uploaded Successfully", "Success");
              this.router.navigate(['/admin/audio-list']);
            } else {
              let error = res.message ?? "Problem in uploading";
              this.toastr.error(error, "Error");
            }
          });
    }
  }

}

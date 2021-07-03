import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "./../user.service";
const swal = require('sweetalert');

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  
  loading = false;

  twilioForm = new FormGroup({
    twilioAccountSid: new FormControl(null, [Validators.required]),
    twilioAuthToken: new FormControl(null, [Validators.required]),
  });

  constructor(public userService:UserService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  submit($ev, value: any) {

    //console.log(value);
    $ev.preventDefault();
    for (let c in this.twilioForm.controls) {
      this.twilioForm.controls[c].markAsTouched();
    }
   // console.log(this.twilioForm.controls);
    if (this.twilioForm.valid) {
      this.userService.addTwilioCredentials(value).subscribe((res) => {
        if (res.code == 1) {
          this.toastr.success(res.message, "Success");
        } else {
          let error = res.message ?? "Problem in saving";
          this.toastr.error(error, "Error");
        }
      });
    }
  }

  removeTwilioCredenitals(value){

    //console.log(value);
    //return false;
    swal({
      title: 'Are you sure?',
      text: 'Your will not be able to recover this!',
      icon: 'warning',
      buttons: {
          cancel: true,
          confirm: {
              text: 'Yes, delete it!',
              value: true,
              visible: true,
              className: "bg-danger",
              closeModal: true
          }
      }
  }).then((data) => {
    if(data) {
      this.loading = true;
      this.userService.removeOptionCredentials(value)
          .subscribe(res => {
            if(res.code == 1) {
              this.toastr.success(res.message, "Success");
            } else {
              this.toastr.error(res.message, "Error");
            }
            this.loading = false;
          });
    }
  });

}

  

}

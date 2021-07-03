import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "./../user.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  loading = false;

  changePasswordForm = new FormGroup({
    newPassword: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor(public userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  submit($ev, value: any) {
    //console.log(value);
    $ev.preventDefault();
    for (let c in this.changePasswordForm.controls) {
      this.changePasswordForm.controls[c].markAsTouched();
    }
    // console.log(this.changePasswordForm.controls);
    if (this.changePasswordForm.valid) {
      this.userService.changePassword(value).subscribe((res) => {
        if (res.code == 1) {
          this.toastr.success(res.message, "Success");
        } else {
          let error = res.message ?? "Problem in saving";
          this.toastr.error(error, "Error");
        }
      });
    }
  }
}

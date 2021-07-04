import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "./../user.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  public countryList: any[];
  public timezoneList: any[];
  public userData: any;

  userInfoForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phone: new FormControl(null),
  });

  userAddress = new FormGroup({
    address: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    country_id: new FormControl(0),
    timezone_id: new FormControl(0),
    zip: new FormControl(null)
  });

  constructor(public userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCountryList();
    this.getTimezoneList();
    this.getUserData();
  }

  getCountryList() {
    this.userService.getCounty().subscribe((res) => {
      if (res.code == 1) {
        this.countryList = res.data ?? [];
      } else {
        this.toastr.error("Country listing not found.");
      }
    });
  }

  getTimezoneList() {
    this.userService.getTimezone().subscribe((res) => {
      if (res.code == 1) {
        this.timezoneList = res.data ?? [];
      } else {
        this.toastr.error("Timezone Listing not found.");
      }
    });
  }

  getUserData() {
    this.userService.getUser().subscribe((res) => {
      if (res.code == 1) {
        this.userData = res.userDetails ?? [];
        /*
         * Set userInfo form
         */
        this.userInfoForm.setValue({
          firstName: this.userData.first_name ?? null,
          lastName: this.userData.last_name ?? null,
          email: this.userData.email ?? null,
          phone: this.userData.phone ?? null,
        });
        /*
         * Set Address Form
         */
        this.userAddress.setValue({
          address: this.userData.address ?? null,
          city: this.userData.city ?? null,
          state: this.userData.state ?? null,
          country_id: this.userData.timezone_id ??  "0",
          timezone_id: this.userData.timezone_id ?? "0",
          zip:this.userData.zip ?? null
        });
      } else {
        this.toastr.error("User Detail not found.");
      }
    });
  }

  submitUserInfo($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.userInfoForm.controls) {
      this.userInfoForm.controls[c].markAsTouched();
    }

    if (this.userInfoForm.valid) {
      this.userService.updateUser(value).subscribe((res) => {
        if (res.code == 1) {
          this.toastr.success(res.message, "Success");
        } else {
          let error = res.message ?? "Problem in saving";
          this.toastr.error(error, "Error");
        }
      });
    }
  }

  submitUserAddress($ev, value: any) {
    $ev.preventDefault();
    this.userService.updateUser(value).subscribe((res) => {
      if (res.code == 1) {
        this.toastr.success(res.message, "Success");
      } else {
        let error = res.message ?? "Problem in saving";
        this.toastr.error(error, "Error");
      }
    });
  }
}

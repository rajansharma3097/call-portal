import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { PhoneNumberComponent } from "../../../shared/forms/phone-number/phone-number.component";
import { CommonService } from "../../../shared/services/common.service";
import { CompanyService } from "../company.service";

@Component({
  selector: "app-add-campaign",
  templateUrl: "./add-campaign.component.html",
  styleUrls: ["./add-campaign.component.scss"],
})
export class AddCampaignComponent implements OnInit {
  @ViewChild(PhoneNumberComponent, { static: true })
  phoneForm: PhoneNumberComponent;

  companies$: Observable<Array<any>>;
  timezones$: Observable<Array<any>>;

  public mask: string;
  public campaignForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.mask = "(000) 000-0000";
  }

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      id: [0],
      company_id: ["", [Validators.required]],
      campaign_name: [null, [Validators.required]],
      phone: this.phoneForm.createGroup(),
      timezone_id: [14, [Validators.required]],
    });

    this.companies$ = this.commonService.companies;
    this.timezones$ = this.commonService.timezones;
  }

  onSubmit($ev) {
    $ev.preventDefault();
    for (let c in this.campaignForm.controls) {
      this.campaignForm.controls[c].markAsTouched();
    }

    if (this.campaignForm.valid) {
      this.companyService
        .addUpdateCampaign(this.campaignForm.value)
        .subscribe((res) => {
          if (res.code == 1) {
            this.toastr.success(res.message, "Success");
            this.router.navigate(["/company/edit-campaign/" + res.campaignId]);
          } else {
            let error = res.message ?? "Problem in adding";
            this.toastr.error(error, "Error");
          }
        });
    }
  }
}

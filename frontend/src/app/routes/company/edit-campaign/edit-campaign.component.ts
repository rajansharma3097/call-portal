import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { PhoneNumberComponent } from "../../../shared/forms/phone-number/phone-number.component";
import { CommonService } from "src/app/shared/services/common.service";
import { CompanyService } from "../company.service";

@Component({
  selector: "app-edit-campaign",
  templateUrl: "./edit-campaign.component.html",
  styleUrls: ["./edit-campaign.component.scss"],
})
export class EditCampaignComponent implements OnInit {

  @ViewChild(PhoneNumberComponent, {static: true}) phoneForm: PhoneNumberComponent;

  countries$: Observable<Array<any>>;
  companies$: Observable<Array<any>>;
  timezones$: Observable<Array<any>>;
  hours: Array<any>;

  open = true;
  open1 = false;
  campaign_id: any;
  public mask: string;
  public countryCode = "+1";
  public campaignForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.mask = "(000) 000-0000";
  }

  ngOnInit(): void {

    this.campaignForm = this.fb.group({
      id: [0],
      company_id: ["", [Validators.required]],
      campaign_name: [null, [Validators.required]],
      phone: this.phoneForm.createGroup(),
      notes: [""],
      timezone_id: ["", [Validators.required]],
      operatingHrs: this.fb.group({
        is_opened: [0, [Validators.required]],
        daySchedule: this.fb.array([]),
      }),
    });

    this.makeHoursForm();
    this.campaign_id = this.route.snapshot.params["id"];
    if (this.campaign_id > 0) {
      this.getCampaignDetail(this.campaign_id);
    }
    this.countries$ = this.commonService.countries;
    this.companies$ = this.commonService.companies;
    this.timezones$ = this.commonService.timezones;
    this.hours = this.commonService.hours;
  }

  get daySchedule(): FormArray {
    return <FormArray>this.campaignForm.get("operatingHrs").get("daySchedule");
  }

  makeHoursForm() {
    let data = [
      { day: "Mon", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Tue", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Wed", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Thu", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Fri", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Sat", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
      { day: "Sun", openTime: "8:00 AM", closeTime: "9:00 PM", isClosed: false },
    ];
    if (data.length > 0) {
      for (let x in data) {
        this.daySchedule.push(
          new FormGroup({
            day: new FormControl(data[x].day),
            openTime: new FormControl(data[x].openTime),
            closeTime: new FormControl(data[x].closeTime),
            isClosed: new FormControl(data[x].isClosed),
          })
        );
      }
    }
  }

  getCampaignDetail(campaignId) {
    this.companyService.getCampaignById(campaignId).subscribe((data) => {
      if (data.code == 1) {
        this.campaignForm.patchValue({
          id: data.campaignDetail.id,
          company_id: data.campaignDetail.company_id,
          campaign_name: data.campaignDetail.campaign_name,
          notes: data.campaignDetail.notes,
          timezone_id: data.campaignDetail.timezone_id,
          phone: this.phoneForm.patchForm({
            country_id: data.campaignDetail.country_id,
            phone_number: data.campaignDetail.phone_number,
          })
        });

        if(data.campaignDetail.operating_hours.hasOwnProperty('is_opened')) {
          (<FormGroup>this.campaignForm.controls['operatingHrs']).controls['is_opened'].patchValue(data.campaignDetail.operating_hours.is_opened);
          (<FormGroup>this.campaignForm.controls['operatingHrs']).controls['daySchedule'].patchValue(data.campaignDetail.operating_hours.daySchedule);
          console.log(this.campaignForm);
        }

      } else {
        this.toastr.error("Company Detail not found", "404");
        this.router.navigate(["/company/campaign-list"]);
      }
    });
  }

  onSubmit($ev) {
    $ev.preventDefault();
    for (let c in this.campaignForm.controls) {
        this.campaignForm.controls[c].markAsTouched();
    }

    if (this.campaignForm.valid) {

      this.companyService.addUpdateCampaign(this.campaignForm.value)
          .subscribe(res => {
            if(res.code == 1) {
              this.toastr.success(res.message, "Success");
              this.router.navigate(['/company/campaign-list']);
            } else {
              let error = res.message ?? "Problem in uploading";
              this.toastr.error(error, "Error");
            }
          });
    }
  }
}

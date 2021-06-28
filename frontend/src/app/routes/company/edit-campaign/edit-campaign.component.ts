import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { CommonService } from "src/app/shared/services/common.service";
import { CompanyService } from "../company.service";

@Component({
  selector: "app-edit-campaign",
  templateUrl: "./edit-campaign.component.html",
  styleUrls: ["./edit-campaign.component.scss"],
})
export class EditCampaignComponent implements OnInit {
  countries$: Observable<Array<any>>;
  companies$: Observable<Array<any>>;
  timezones$: Observable<Array<any>>;
  hours: Array<any>;

  open = true;
  open1 = false;
  campaign_id: any;
  public mask: string;
  public countryCode = "+1";
  campaignForm = new FormGroup({
    id: new FormControl(0),
    company_id: new FormControl("", [Validators.required]),
    campaign_name: new FormControl(null, [Validators.required]),
    country_id: new FormControl("", [Validators.required]),
    phone_number: new FormControl("", [Validators.required]),
    notes: new FormControl(""),
    timezone_id: new FormControl("", [Validators.required]),
    operatingHrs: new FormGroup({
      is_opened: new FormControl(0, [Validators.required]),
      daySchedule: new FormArray([]),
    }),
  });

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.mask = "(000) 000-0000";
  }

  ngOnInit(): void {
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
          country_id: data.campaignDetail.country_id,
          notes: data.campaignDetail.notes,
          phone_number: data.campaignDetail.phone_number,
          timezone_id: data.campaignDetail.timezone_id,
        });

        console.log(data.campaignDetail.operating_hours);
        if(data.campaignDetail.operating_hours) {
          (<FormGroup>this.campaignForm.controls['operatingHrs']).controls['is_opened'].patchValue(data.campaignDetail.operating_hours.is_opened);
          (<FormGroup>this.campaignForm.controls['operatingHrs']).controls['daySchedule'].patchValue(data.campaignDetail.operating_hours.daySchedule);
          console.log(this.campaignForm);
        }

      } else {
        this.toastr.error("Company Detail not found", "404");
        this.router.navigate(["/admin/source-list"]);
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

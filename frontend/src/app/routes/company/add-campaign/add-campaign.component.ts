import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {

  countries$: Observable<Array<any>>;
  companies$: Observable<Array<any>>;
  timezones$: Observable<Array<any>>;

  open = true;
  open1 = false;
  campaign_id: any;
  public mask: string;
  public countryCode = "+1";
  campaignForm = new FormGroup({
    id: new FormControl(0),
    company_id: new FormControl("", [Validators.required]),
    campaign_name: new FormControl(null, [Validators.required]),
    country_id: new FormControl(1, [Validators.required]),
    phone_number: new FormControl("", [Validators.required]),
    timezone_id: new FormControl(14, [Validators.required]),
  });

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.mask = "(000) 000-0000";
  }

  ngOnInit(): void {
    this.countries$ = this.commonService.countries;
    this.companies$ = this.commonService.companies;
    this.timezones$ = this.commonService.timezones;
  }

  onSubmit(ev) {

  }

}

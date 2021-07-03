import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { CommonService } from "../../services/common.service";

interface Phone {
  country_id;
  phone_number;
}

type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ];
};

@Component({
  selector: "app-phone-number",
  templateUrl: "./phone-number.component.html",
  styleUrls: ["./phone-number.component.scss"],
})
export class PhoneNumberComponent implements OnInit, OnDestroy {
  countries: Array<any>;

  private countrySub: Subscription;
  private countryChangesSub: Subscription;

  public phoneForm: FormGroup;
  public mask: string;
  public countryCode = "+1";
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {
    this.mask = "(000) 000-0000";
  }

  ngOnInit(): void {
    this.countrySub = this.commonService.countries.subscribe((countries) => {
      this.countries = countries;
    });

    this.countryChangesSub = this.phoneForm
      .get("country_id")
      .valueChanges.subscribe((countryId) => {
        this.countryCode =
          this.countries.find((country) => country.id == countryId)
            ?.country_code ?? "";
      });
  }

  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.countryChangesSub.unsubscribe();
  }

  createGroup() {
    const config: FormGroupConfig<Phone> = {
      country_id: [1, Validators.required],
      phone_number: ["", Validators.required],
    };

    this.phoneForm = this.formBuilder.group(config);

    return this.phoneForm;
  }

  patchForm(object) {
    setTimeout(() => {
      this.phoneForm.patchValue(object);
    }, 1000);
  }

}

// https://coryrylan.com/blog/building-reusable-forms-in-angular
// https://www.intertech.com/angular-development-9-reusable-sub-forms/
// https://tomastrajan.medium.com/angular-reactive-sub-forms-type-safe-without-duplication-dbd24225e1e8

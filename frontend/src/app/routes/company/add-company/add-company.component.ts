import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../../../shared/services/common.service';
import { CompanyService } from '../company.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  countries$: Observable<Array<any>>;

  companyForm = new FormGroup({
    id: new FormControl(0),
    company_name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required]),
    company_email: new FormControl(null, [Validators.required]),
    country_id: new FormControl('', [Validators.required]),
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    company_website: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    zip: new FormControl(null),
  });

  constructor(private toastr: ToastrService,
      private router: Router,
      private commonService: CommonService,
      private companyService: CompanyService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.countries$ = this.commonService.countries;
    this.activatedRoute.params.subscribe(params => {
      let companyId = params.id ?? 0;
      if( companyId > 0 ) {
        this.getCompanyDetail(companyId);
      }
    });
  }

  getCompanyDetail(companyId)
  {
    this.companyService.getCompanyById(companyId).subscribe(data => {
      if(data.code == 1) {
        this.companyForm.setValue({
          id: data.companyDetail.id,
          company_name: data.companyDetail.company_name,
          phone_number: data.companyDetail.phone_number,
          company_email: data.companyDetail.company_email,
          country_id: data.companyDetail.country_id,
          first_name: data.companyDetail.first_name,
          last_name: data.companyDetail.last_name,
          company_website: data.companyDetail.company_website,
          address: data.companyDetail.address,
          city: data.companyDetail.city,
          state: data.companyDetail.state,
          zip: data.companyDetail.zip,
        });
      } else {
        this.toastr.error("Company Detail not found", "404");
        this.router.navigate(['/admin/source-list']);
      }
    });
  }

  submit($ev, value: any){
    $ev.preventDefault();
    for (let c in this.companyForm.controls) {
        this.companyForm.controls[c].markAsTouched();
    }
    if (this.companyForm.valid) {
        console.log('Valid!');
        console.log(value);
      
      this.companyService.addCompany(value)
          .subscribe(res => {
            if(res.code == 1) {
              this.toastr.success(res.message, "Success");
              this.router.navigate(['/company/company-list']);
            } else {
              let error = res.message ?? "Problem in uploading";
              this.toastr.error(error, "Error");
            }
          });
    }
  }

}

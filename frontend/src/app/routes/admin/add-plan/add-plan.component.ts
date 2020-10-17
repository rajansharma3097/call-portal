import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  tinyApiKey: string;
  plan_id: any;
  formData: object;

  myForm = new FormGroup({
    plan_name: new FormControl(null, [Validators.required]),
    signup_cost: new FormControl(null, [Validators.required]),
    id: new FormControl(0),
    plan_description: new FormControl(null)
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private adminService: AdminService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.plan_id = this.route.snapshot.params['plan_id'];
    if (this.plan_id > 0) {
      this.getPlanById(this.plan_id);
    }
    this.tinyApiKey = this.adminService.getTinyApiKey();
  }

  /*
   * The function add & update plan setting
  */
  submit($ev, value) {


    $ev.preventDefault();
    for (let c in this.myForm.controls) {
      this.myForm.controls[c].markAsTouched();
    }

    if (this.myForm.valid) {


      this.adminService.addPlan(value)
        .subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message, "Success");
            this.router.navigate(['/admin/plan-list']);
          } else {
            let error = res.message ?? "Problem in updating plan";
            this.toastr.error(error, "Error");
          }
        });
    }
  }

  /*
   * The function get Plan
  */
  getPlanById(plan_id) {

    this.adminService.getPlan(plan_id)
      .subscribe(res => {
        if (res.code == 1) {
          this.formData = {
            plan_name: res.data.plan_name,
            signup_cost: res.data.signup_cost,
            id: res.data.id,
            plan_description: res.data.plan_description
          }

          this.myForm.patchValue(this.formData);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }



}

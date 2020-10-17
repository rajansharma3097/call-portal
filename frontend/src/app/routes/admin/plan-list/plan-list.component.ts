import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/shared/page';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';
const swal = require('sweetalert');


@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild('myTable', { static: true }) tableExp: any;
  ColumnMode = ColumnMode;
  public apiHost = environment.apiHost;
  rows = [];
  page = new Page();
  loading = false;
  
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 15;
  }

  ngOnInit(): void {
    this.getPlanList({ offset: 0 });
  }

  /*
   *The function on fetch plan list from the server
  */
  getPlanList(pageInfo) {

    console.log("hiiii");
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getPlanListing(this.page)
      .subscribe(res => {
        if (res.code == 1) {
          this.rows = res.data ?? [];
        } else {
          this.toastr.error("Problem in getting response.", "Error");
        }
        this.loading = false;
      });
  }

  /*
   * The function on plan delete 
  */
  onPlanDelete(planId: number) {

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
      if (data) {
        this.loading = true;
        this.adminService.deletePlan(planId)
          .subscribe(res => {
            if (res.code == 1) {
              this.toastr.success(res.message, "Success");
              this.getPlanList({ offset: this.page.pageNumber - 1 });
            } else {
              this.toastr.error(res.message, "Error");
            }
            this.loading = false;
          });
      }
    });

  }

}

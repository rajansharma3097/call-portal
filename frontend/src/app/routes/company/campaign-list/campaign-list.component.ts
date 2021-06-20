import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { CompanyService } from '../company.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/page';

const swal = require('sweetalert');

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild('myTable', { static: true }) tableExp: any;

  public apiHost = environment.apiHost;
  rows = [];
  page = new Page();
  loading = false;
  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 15;
  }

  ngOnInit(): void {
    this.getCampaignList({ offset: 0 });
  }

  getCampaignList(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.companyService.getCampaignListing(this.page)
        .subscribe(res => {
          if(res.code == 1) {
            this.rows = res.data ?? [];
          } else {
            this.toastr.error("Problem in getting response.", "Error");
          }
          this.loading = false;
        });
  }

  onCampaignDelete(companyId: number) {

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
      if(data) {
        this.loading = true;
        this.companyService.deleteCompany(companyId)
            .subscribe(res => {
              if(res.code == 1) {
                this.toastr.success(res.message, "Success");
                this.getCampaignList({ offset: this.page.pageNumber-1 });
              } else {
                this.toastr.error(res.message, "Error");
              }
              this.loading = false;
            });
          }
      });
  }

  onSort(ev) {
    console.log(ev);
  }

}

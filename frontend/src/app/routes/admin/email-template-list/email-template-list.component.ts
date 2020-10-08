import { Component, OnInit, ViewChild } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/page';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild('myTable', { static: true }) tableExp: any;
  ColumnMode = ColumnMode;
  public apiHost = environment.apiHost;
  rows = [];
  page = new Page();
  loading = false;
  // columns = [{ prop: 'ID' }, { name: 'Audio Name' }, { name: 'Play' }];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 15;
  }

  ngOnInit(): void {
    this.getEmailList({ offset: 0 });
  }

  getEmailList(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getEmailListing(this.page)
        .subscribe(res => {
          if(res.code == 1) {
            this.rows = res.data ?? [];
          } else {
            this.toastr.error("Problem in getting response.", "Error");
          }
          this.loading = false;
        });
  }

}

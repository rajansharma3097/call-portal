import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/shared/page';
import { AdminService } from '../admin.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild('myTable', { static: true }) tableExp: any;

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
    this.getSourceList({ offset: 0 });
  }

  getSourceList(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getSourceListing(this.page)
        .subscribe(res => {
          if(res.code == 1) {
            this.rows = res.data ?? [];
          } else {
            this.toastr.error("Problem in getting response.", "Error");
          }
          this.loading = false;
        });
  }

  onSourceDelete(audioId: number) {

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
        this.adminService.deleteSource(audioId)
            .subscribe(res => {
              if(res.code == 1) {
                this.toastr.success(res.message, "Success");
                this.getSourceList({ offset: this.page.pageNumber-1 });
              } else {
                this.toastr.error(res.message, "Error");
              }
              this.loading = false;
            });
      }
    });

  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/page';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent implements OnInit {

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
    this.getAudioList({ offset: 0 });
  }

  getAudioList(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getAudioListing(this.page)
        .subscribe(res => {
          if(res.code == 1) {
            this.rows = res.data ?? [];
          } else {
            this.toastr.error("Problem in getting response.", "Error");
          }
          this.loading = false;
        });
  }

  onSort(ev) {
    console.log(ev);
  }

  onAudioDelete(audioId: number) {
    this.loading = true;
    this.adminService.deleteAudio(audioId)
        .subscribe(res => {
          if(res.code == 1) {
            this.toastr.success(res.message, "Success");
            this.getAudioList({ offset: this.page.pageNumber-1 });
          } else {
            this.toastr.error(res.message, "Error");
          }
          this.loading = false;
        });
  }

  updateFilter(event) {
    console.log(event.target.value.toLowerCase());
  }

}

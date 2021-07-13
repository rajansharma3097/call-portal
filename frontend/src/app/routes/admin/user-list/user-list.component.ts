import { Component, OnInit, ViewChild,TemplateRef } from "@angular/core";
import { Page } from "src/app/shared/page";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../admin.service";
import { TokenService } from '../../../core/token/token.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
const swal = require("sweetalert");

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild("myTable", { static: true }) tableExp: any;
  ColumnMode = ColumnMode;
  public apiHost = environment.apiHost;
  rows = [];
  page = new Page();
  search ="";
  loading = false;
  modalRef: BsModalRef;
  UserDetail;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 15;
  }

  ngOnInit(): void {
    this.getUserList({ offset: 0 });
  }

  /*
   *The function on fetch user listing from the server
   */
  getUserList(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getUserListing(this.page,this.search).subscribe((res) => {

         console.log(res);

      if (res.code == 1) {
        this.rows = res.data ?? [];
      } else {
        this.toastr.error(res.message ?? "Problem to fetching record", "Error");
      }
      this.loading = false;
    });
  }
  
  /*
   *A method search User 
   *@param UserId
   */
  searchUserList(pageInfo={ offset: 0 },search){
    
   // console.log(search);
    this.page.pageNumber =pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getUserListing(this.page,search).subscribe((res) => {
      if (res.code == 1) {
        this.rows = res.data ?? [];
      } else {
        this.toastr.error(res.message ?? "Problem to fetching record", "Error");
      }
      this.loading = false;
    });

  }

 
  /*
   *A method switch to user account
   *@param UserId
   */
   switchUserAccount(userId: number) {

    if (userId > 0) {
      this.loading = true;
      this.adminService.switchUserAccount(userId).subscribe((res) => {
        if (res.code == 1) {
          
          if(!this.tokenService.getAdminToken())
               this.tokenService.setAdminToken(this.tokenService.getToken());

          this.tokenService.handle(res.access_token);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
      this.loading = false;
    } else {
      this.toastr.error("Invalid User Id", "Error");
    }
  }


  public ngAfterViewInit() {
    this.cellOverflowVisible();
  }

  private cellOverflowVisible() {
    const cells = document.getElementsByClassName('datatable-body-cell overflow-visible');
    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].setAttribute('style', 'overflow: visible !important');
    }
  }

  openModal(template: TemplateRef<any>,row,value) {

    console.log(row,value);
    this.UserDetail =row;
    this.modalRef = this.modalService.show(template);
  }

  deleteAccount(value){

    alert(value);

  }


}

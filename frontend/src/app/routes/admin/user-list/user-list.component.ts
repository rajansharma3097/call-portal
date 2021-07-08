import { Component, OnInit, ViewChild } from "@angular/core";
import { Page } from "src/app/shared/page";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../admin.service";
import { TokenService } from '../../../core/token/token.service';
import { Router } from '@angular/router';
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

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
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
   switchUserAccount($ev,userId: number) {

    console.log($ev);
    return false;
    
    if (userId > 0) {
      this.loading = true;
      this.adminService.switchUserAccount(userId).subscribe((res) => {
        if (res.code == 1) {
          
          if(!this.tokenService.getAdminToken())
               this.tokenService.setAdminToken(this.tokenService.getToken());

          this.tokenService.handle(res.access_token);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error("Problem in getting response.", "Error");
        }
      });
      this.loading = false;
    } else {
      this.toastr.error("Invalid User Id", "Error");
    }
  }


}

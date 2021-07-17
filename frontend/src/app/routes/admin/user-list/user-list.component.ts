import { ActiveFilterPipe } from "./../../../shared/pipes/active-filter.pipe";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Page } from "src/app/shared/page";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../admin.service";
import { TokenService } from "../../../core/token/token.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormControl, FormGroup, Validators } from "@angular/forms";

const swal = require("sweetalert");

interface userObject {
  id: number;
  email: string;
  status: number;
  first_name: string;
}
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  styles: [
    `
      .dropdown-menu {
        postition: relative;
      }
    `,
  ],
})
export class UserListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @ViewChild("myTable", { static: true }) tableExp: any;
  ColumnMode = ColumnMode;
  public apiHost = environment.apiHost;
  rows = [];
  page = new Page();
  search = "";
  loading = false;
  modalRef: BsModalRef;
  userDetail: userObject;
  newPassword: string;
  activeBar: number;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 15;
    this.activeBar = 1;
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
    this.adminService
      .getUserListing(this.page, this.search, this.activeBar)
      .subscribe((res) => {
        // console.log(res);
        if (res.code == 1) {
          this.rows = res.data ?? [];
        } else {
          this.toastr.error(
            res.message ?? "Problem to fetching record",
            "Error"
          );
        }
        this.loading = false;
      });
  }

  /*
   *A method search User
   *@param UserId
   */
  searchUserList(pageInfo = { offset: 0 }, search) {
    // console.log(search);
    this.page.pageNumber = pageInfo.offset + 1;
    this.loading = true;
    this.adminService.getUserListing(this.page, search).subscribe((res) => {
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
          if (!this.tokenService.getAdminToken())
            this.tokenService.setAdminToken(this.tokenService.getToken());

          this.tokenService.handle(res.access_token);
          this.router.navigate(["/home"]);
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
    const cells = document.getElementsByClassName(
      "datatable-body-cell overflow-visible"
    );
    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].setAttribute("style", "overflow: visible !important");
    }
  }

  openModal(template: TemplateRef<any>, user: userObject) {
    this.userDetail = user;
    this.modalRef = this.modalService.show(template);
  }

  deleteAccount(user: userObject) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: {
          text: `${user.status ? "Delete" : "Activate"}`,
          value: true,
          visible: true,
          className: `${user.status ? "bg-danger" : "bg-success"}`,
          closeModal: true,
        },
      },
    }).then((data) => {
      if (data) {
        this.loading = true;
        this.adminService.deleteUser(user.id).subscribe((res) => {
          if (res.code == 1) {
            user.status = res.status;
            this.toastr.success(res.message, "Success");
            // this.getPlanList({ offset: this.page.pageNumber - 1 });
          } else {
            this.toastr.error(res.message, "Error");
          }
          this.loading = false;
        });
      }
    });
  }

  onUpdatePassword(formData) {
    let postData = {
      password: formData.value.newPassword,
      userId: this.userDetail.id,
    };
    this.loading = true;
    this.adminService.changeUserPassword(postData).subscribe((res) => {
      if (res.code == 1) {
        this.toastr.success(res.message, "Success");
        this.modalRef.hide();
      } else {
        this.toastr.error(res.message, "Error");
      }
      this.loading = false;
    });
  }

  generatePassword(passwordLength) {
    const numberChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "~!@#$^&*(){}?_)(*";
    const allChars = numberChars + upperChars + lowerChars + specialChars;
    let randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = specialChars;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    this.newPassword = this.shuffleArray(
      randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
    ).join("");
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  copyPassword() {
    console.log(this.newPassword);

    //const copyText = document.getElementById("newPassword");
    /* Select the text field */
    //copyText.select();
    //copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    document.execCommand("copy");
  }

  activeTab(tabNumber: number): void {
    if (this.activeBar != tabNumber) {
      this.activeBar = tabNumber;
      this.getUserList({ offset: 0 });
    }
  }
}

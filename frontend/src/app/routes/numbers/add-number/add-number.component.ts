import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "../../../shared/services/common.service";

@Component({
  selector: "app-add-number",
  templateUrl: "./add-number.component.html",
  styleUrls: ["./add-number.component.scss"],
})
export class AddNumberComponent implements OnInit {
  countries$: Observable<Array<any>>;
  campaigns$: Observable<Array<any>>;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.countries$ = this.commonService.countries;
    this.campaigns$ = this.commonService.campaigns;
  }
}

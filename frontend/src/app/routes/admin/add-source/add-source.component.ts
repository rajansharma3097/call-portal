import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss']
})
export class AddSourceComponent implements OnInit {

  sourceForm = new FormGroup({
    sourceId: new FormControl(0),
    sourceName: new FormControl(null, [Validators.required]),
  });

  constructor(public adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let sourceId = params.id ?? 0;
      if( sourceId > 0 ) {
        this.adminService.getSourceById(sourceId).subscribe(data => {
          if(data.code == 1) {
            this.sourceForm.setValue({
              sourceId: data.sourceDetail.id,
              sourceName: data.sourceDetail.source_name
            });
          } else {
            this.toastr.error("Source Detail not found", "404");
            this.router.navigate(['/admin/source-list']);
          }
        });
      }
    });
  }

  submit($ev, value: any){
    $ev.preventDefault();
    for (let c in this.sourceForm.controls) {
        this.sourceForm.controls[c].markAsTouched();
    }
    if (this.sourceForm.valid) {

      this.adminService.addSource(value)
          .subscribe(res => {
            if(res.code == 1) {
              this.toastr.success(res.message, "Success");
              this.router.navigate(['/admin/source-list']);
            } else {
              let error = res.message ?? "Problem in saving";
              this.toastr.error(error, "Error");
            }
          });
    }
  }

}

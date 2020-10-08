import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-edit-email-template',
  templateUrl: './edit-email-template.component.html',
  styleUrls: ['./edit-email-template.component.scss'],
})
export class EditEmailTemplateComponent implements OnInit {


  contents: string;
  email_tempate_id: string;
  formData: object;
  email_token;
  tinyApiKey: string;
  myForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    id: new FormControl(0),
    email_body: new FormControl(null)
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private adminService: AdminService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.email_tempate_id = this.route.snapshot.params['id'];
    this.getEmailTempate(this.email_tempate_id);
    this.tinyApiKey = this.adminService.getTinyApiKey(); //  Set API Key //
  }

  /*
   *The function get Email template 
  */
  getEmailTempate(email_tempate_id) {
    this.adminService.getEmailtemplate(email_tempate_id)
      .subscribe(res => {
        if (res.code == 1) {
          this.formData = {
            title: res.data.title,
            subject: res.data.subject,
            id: res.data.id,
            email_body: res.data.body
          }
          this.parseEmailToken(res.data.token);
          this.myForm.patchValue(this.formData);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }

  /*
   *The function Update Email template
  */
  submit($ev, value: any) {

    $ev.preventDefault();
    for (let c in this.myForm.controls) {
      this.myForm.controls[c].markAsTouched();
    }

    if (this.myForm.valid) {

      this.adminService.updateEmailTemplate(value)
        .subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message, "Success");
            this.router.navigate(['/admin/email-template-list']);
          } else {
            let error = res.message ?? "Problem in updating email template.";
            this.toastr.error(error, "Error");
          }
        });
    }
  }


  /*
   *The function Parse Email Token
  */
  parseEmailToken(token) {
    this.email_token = token.split(",");
  }

  /*
   *The function select token
  */
  selecttoken(obj) {

    console.log(obj);
    //this.editor.setContent(obj);
  }
}

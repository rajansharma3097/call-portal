import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService } from '../../../core/auth/auth.service';
import { TokenService } from '../../../core/token/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    error = null;
    valForm: FormGroup;

    constructor(
        public fb: FormBuilder, 
        private authService: AuthService,
        private tokenService: TokenService,
        public router: Router
    ) {

        this.valForm = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
            console.log(value.email, value.password);
            console.log(JSON.stringify(this.valForm.value));
            this.error = null;
            return this.authService.login(value.email, value.password).subscribe(
              data => this.handleResponse(data)
             // err  => this.handleError(err) // no more 
            );
        }
    }

    handleResponse(data) {

        //console.log(data);
      //  return false;
        if(data.code == 1){
            this.tokenService.handle(data.access_token);
            this.router.navigate(['/home']); 
        }else{
            this.error = data.message;  
        }
    
     }

    handleError(error) {
      //console.log(error.error.error);
      this.error = error.error.error;
    }
    ngOnInit() {

    }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { TokenService } from '../../../core/token/token.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;
    passwordForm: FormGroup;
    error = [];
    constructor(public fb: FormBuilder, private authService: AuthService, private tokenService: TokenService,
        public router: Router) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = fb.group({
            'name': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            // 'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm
        });


    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
            this.error = null;
            let payLoad = { name: value.name, email: value.email, password: value.passwordGroup.password, password_confirmation: value.passwordGroup.confirmPassword };
            this.error = [];
            return this.authService.signup(payLoad).subscribe(
                data => this.handleResponse(data),
                err => this.handleError(err)
            );
        }
    }

    handleResponse(data) {

        console.log(data);
        //return false;
        this.tokenService.handle(data.access_token);
        this.router.navigate(['/home']);
    }

    handleError(error) {
        console.log(error.error.errors);
        const errors = error.error.errors;
        for (const property in errors) {
            this.error = this.error || [];
            this.error.push(errors[property][0]);
        }
    }

    ngOnInit() {
    }

}

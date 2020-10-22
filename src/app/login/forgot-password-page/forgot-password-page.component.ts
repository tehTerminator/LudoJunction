import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SqlResponse } from '../../shared/collection';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {
	forgotPageForm: FormGroup;
	otpSent = false;
	loading = false;

  constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private fb: FormBuilder,
		private http: HttpClient) { }

  ngOnInit(): void {
		this.forgotPageForm = this.fb.group({
			mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
			otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
			password: ['', Validators.required]
		});
  }

	onSendOtp(): void {
		if (this.mobile.invalid) {
			this.snackBar.open('Invalid Mobile Number', 'TRY AGAIN', {duration: 2000});
			return;
		}

		this.http.post(environment.url.user.forgot, {mobile: this.mobile.value})
		.subscribe((res: SqlResponse) => {
			console.log(res);
			this.loading = false;
			if (res.status) {
				this.otpSent = true;
				this.snackBar.open('OTP Sent Success, Please Check Your Email', '', {duration: 2000});
			} else {
				console.log('Error Occurred')
				this.snackBar.open('Error Occurred Try Again', 'DISMISS', {duration: 2000});
			}
		});
	}

	onSubmit(): void {
		if (this.forgotPageForm.invalid) {
			this.snackBar.open('Invalid Form Data', 'TRY AGAIN', {duration: 2000});
			return;
		}

		this.http.post(environment.url.user.forgot, this.forgotPageForm.value)
		.subscribe((res: SqlResponse) => {
			console.log(res);
			if (res.status) {
				this.snackBar.open('Password Reset Success', 'LOGIN', {duration: 2000});
				this.router.navigate(['/login']);
			} else {
				this.snackBar.open(res.message[0], 'TRY AGAIN', {duration: 2000});
			}
		})
	}

	/*****GETTERS*****/
	get mobile(): FormControl {
		return this.forgotPageForm.get('mobile') as FormControl;
	}

	get otp(): FormControl {
		return this.forgotPageForm.get('otp') as FormControl;
	}

	get password(): FormControl {
		return this.forgotPageForm.get('password') as FormControl;
	}

}

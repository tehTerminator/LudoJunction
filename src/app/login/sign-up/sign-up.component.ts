import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/auth.service';
import { SqlResponse } from '../../shared/collection';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;
	loading = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private http: HttpClient,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			title: ['', Validators.required],
			password: ['', Validators.required],
			mobile: ['', [
				Validators.required,
				Validators.pattern("^[6-9][0-9]{9}$"),
			], this.validatorMobileNotAvailable.bind(this)],
			agree: [null, Validators.requiredTrue]
		});
	}

	get title(): FormControl {
		return this.signUpForm.get('title') as FormControl;
	}

	get password(): FormControl {
		return this.signUpForm.get('password') as FormControl;
	}

	get email(): FormControl {
		return this.signUpForm.get('email') as FormControl;
	}

	get mobile(): FormControl {
		return this.signUpForm.get('mobile') as FormControl;
	}

	get agree(): FormControl {
		return this.signUpForm.get('agree') as FormControl
	}

	onSubmit() {
		if (this.signUpForm.invalid) {
			return;
		}

		const title = this.title.value;
		const password = this.password.value;
		const mobile = this.mobile.value;
		this.loading = true;

		this.authService.signUp(title, mobile, password)
			.subscribe((res: SqlResponse) => {
				console.log(res);
				this.loading = false;
				if (res.status) {
					// this.router.navigate(['/login', 'activate', res.data[0].id]);
					this.router.navigate(['/login', 'signIn']);
					this.snackBar.open('User Created Successfully', 'DISMISS', {duration: 5000});
				} else {
					// Show Some Error Message
					this.snackBar.open('Try Again', 'DISMISS', {duration: 5000});
				}
			});
	}

	validatorMobileNotAvailable(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		const promise = new Promise<ValidationErrors | null>((resolve, rejects) => {
			this.http.post(environment.url.user.select, { andWhere: { mobile: control.value } })
				.subscribe((res: SqlResponse) => {
					console.log(res);
					if (res.data.length > 0) {
						const error: ValidationErrors = { mobileIsNotAvailable: true }
						resolve(error);
					} else {
						resolve(null);
					}
				})
		});
		return promise;
	}


}

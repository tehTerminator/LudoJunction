import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/auth.service';
import { SqlRequest, SqlResponse } from '../../shared/collection';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;
	readOnlyReferrer = false;
	loading = false;

	constructor(
		private http: HttpClient,
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private snackBar: MatSnackBar,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			title: ['', Validators.required],
			password: ['', Validators.required],
			mobile: ['', [
				Validators.required,
				Validators.pattern("^[6-9][0-9]{9}$"),
			], this.isAvailableValidator.bind(this)],
			email: ['', Validators.email, this.isAvailableValidator.bind(this)],
			agree: [null, Validators.requiredTrue],
			referrer: ['', [], this.isNotAvailableValidator.bind(this)]
		});
		this.route.queryParams.subscribe(
			params => {
				const referrerMobile = params['referrer'];
				if (referrerMobile !== undefined) {
					this.signUpForm.patchValue({referrer: referrerMobile});
					this.readOnlyReferrer = true;
				}
			}
		)
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

	get referrer(): FormControl {
		return this.signUpForm.get('referrer') as FormControl;
	}

	get agree(): FormControl {
		return this.signUpForm.get('agree') as FormControl
	}

	getControlName(c: AbstractControl): string {
		const formGroup = c.parent.controls;
		return Object.keys(formGroup).find(name => c === formGroup[name]);
	}

	onSubmit() {
		if (this.signUpForm.invalid) {
			return;
		}

		const userData = {
			title:  this.title.value,
			password:  this.password.value,
			mobile:  this.mobile.value,
			referrer:  this.referrer.value,
			email:  this.email.value,
		}
		this.loading = true;
		console.log(userData);
		this.authService.signUp(userData)
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

	isAvailableValidator(control: AbstractControl)
		: Promise<ValidationErrors | null> 
			| Observable<ValidationErrors | null>  {
				const promise = new Promise<ValidationErrors | null>((resolve) => {
					const req: SqlRequest = {andWhere: {}};
					req.andWhere[this.getControlName(control)] = control.value;
					this.http.post(environment.url.user.select, req)
					.subscribe((res: SqlResponse) => {
						if (res.data.length > 0) {
							const error: ValidationErrors = { isNotAvailable: true }
							resolve(error);
						} else {
							resolve(null);
						}
					})
				});
				return promise;
			}

			isNotAvailableValidator(control: AbstractControl)
				: Promise<ValidationErrors | null> 
					| Observable<ValidationErrors | null> {
						const promise = new Promise<ValidationErrors | null>((resolve) => {
							if (control.value === '') {
								resolve(null);
							}
							const req: SqlRequest = {andWhere: {mobile: control.value}};
							this.http.post(environment.url.user.select, req)
							.subscribe((res: SqlResponse) => {
								if (res.data.length > 0) {
									resolve(null);
								} else {
									const error: ValidationErrors = { referrerNotAvailable: true }
									resolve(error);
								}
							})
						});
						return promise;
					}
}

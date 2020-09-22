import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			title: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', [
				Validators.required,
				Validators.email
			], this.validatorEmailNotAvailable.bind(this)],
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

		const title = this.signUpForm.get('title').value;
		const email = this.signUpForm.get('email').value;
		const password = this.signUpForm.get('password').value;

		this.authService.signUp(title, email, password)
			.subscribe((res: SqlResponse) => {
				if (res.status) {
					this.router.navigate(['/login', 'activate', res.data[0].id]);
				} else {
					// Show Some Error Message
					console.log('Unable to Process this time');
				}
			});
	}

	validatorEmailNotAvailable(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		const promise = new Promise<ValidationErrors | null>((resolve, rejects) => {
			this.http.post(environment.url.user.select, { andWhere: { email: control.value } })
				.subscribe((res: SqlResponse) => {
					if (res.data.length > 0) {
						const error: ValidationErrors = { emailIsNotAvailable: true }
						resolve(error);
					} else {
						resolve(null);
					}
				})
		});
		return promise;
	}

	validatorMobileNotAvailable(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		const promise = new Promise<ValidationErrors | null>((resolve, rejects) => {
			this.http.post(environment.url.user.select, { andWhere: { mobile: control.value } })
				.subscribe((res: SqlResponse) => {
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

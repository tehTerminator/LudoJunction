import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { SqlResponse } from './../../shared/collection';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	signInForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.signInForm = this.fb.group({
			username: ['', [
				Validators.required, 
				Validators.pattern("^[6-9][0-9]{9}$")
				]
			],
			password: ['', Validators.required]
		});
	}

	get username(): FormControl {
		return this.signInForm.get('username') as FormControl;
	}

	get password(): FormControl {
		return this.signInForm.get('password') as FormControl;
	}

	onSubmit() {
		if (this.signInForm.invalid) {
			return;
		}
		const username = this.signInForm.get('username').value;
		const password = this.signInForm.get('password').value;

		this.authService.signIn(username, password)
			.subscribe((res: SqlResponse) => {
				console.log(res);
				if (res.status) {
					this.router.navigate(['/player']);
				}
			});
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		if (this.signInForm.invalid) {
			return;
		}
		const username = this.signInForm.get('username').value;
		const password = this.signInForm.get('password').value;

		this.authService.signIn(username, password)
			.subscribe((res: SqlResponse) => {
				if (res.status && res.data.length === 1) {
					const userData = res.data[0];
				}
			});
	}
}

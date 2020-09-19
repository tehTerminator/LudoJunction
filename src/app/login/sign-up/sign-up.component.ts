import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			title: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', Validators.required]
		});
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
					// Goto Login Page
					// this.router.navigate(['/login']);
				} else {
					// Show Some Error Message
				}
			});
	}
}

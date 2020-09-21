import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
		private router: Router
	) { }

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			title: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			agree: [null, Validators.requiredTrue]
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
					this.router.navigate(['/login', 'activate', res.data[0].id ]);
				} else {
					// Show Some Error Message
					console.log('Unable to Process this time');
				}
			});
	}
}

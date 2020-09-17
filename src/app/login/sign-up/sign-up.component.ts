import { Component, OnInit } from '@angular/core';

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
			username: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', Validators.required]
		});
  }

	onSubmit() {
		if (this.signUpForm.invalid) {
			return;
		}

		this.authService.signUp(title, username, password, email)
		.subscribe((res: SqlResponse<UserData>) => {
			if (res.status) {
				// Goto Login Page
				// this.router.navigate(['/login']);
			} else {
				// Show Some Error Message
			}
		})
	}
}

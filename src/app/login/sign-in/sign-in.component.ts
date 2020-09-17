import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ADMINISTRATOR } from './../../shared/collection';

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
		if ( this.signInForm.invalid ) {
			return;Î
		}
		const username = this.signInForm.get('username').value;
		const password = this.signInForm.get('password').value;

		this.authService.signIn(username, password)
		.subscribe((res: SqlResponse<UserData>) => {
			if ( res.status && res.data.length === 1 ) {
				const userData = res.data[0];
				if ( userData.type === ADMINSTRATOR ) {
					// Goto Admin Dashboard
					// this.router.nagivate(['/admin']);
				} 
				else {
					// Goto Player Dashboard
					// this.router.navigate(['/dashboard']);
				}Î
			}
		});
	}
}

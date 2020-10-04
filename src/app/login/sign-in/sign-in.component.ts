
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from '../../shared/user.model';
import { AuthService } from './../../shared/auth.service';
import { SqlResponse, UserType } from './../../shared/collection';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
	signInForm: FormGroup;
	loading = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private snackBar: MatSnackBar
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
		this.loading = true;
		const username = this.signInForm.get('username').value;
		const password = this.signInForm.get('password').value;

		this.authService.signIn(username, password)
			.subscribe(
			(res: SqlResponse) => {
				if (res.status) {
					setTimeout(() => this.redirect(), 1000);
				} else {
					this.loading = false;
					this.snackBar.open('Try Again', '', {duration: 2000});
				}	
			},
			err => {
				this.loading = false;
				this.snackBar.open('Error Occurred', 'DISMISS', {duration: 5000});
				// console.log(err);
			});
	}

	private redirect() {
		this.loading = false;
		// console.log(this.authService);
		this.authService.user
		.pipe(take(1))
		.subscribe((user: User) => {
			// console.log('redirect()', user);
			if (!!user) {
				// console.log('Logged In', user);
				if (user.type === UserType.ADMINISTRATOR) {
					this.router.navigate(['/admin']);
				} else {
					this.router.navigate(['/player']);
				}
			} else {
				// console.log('!!user ===', !!user);
				// console.log('Sending Try Again Message', user);
				this.snackBar.open('Try Again', '', {duration: 2000});
			}
		})
	}
}

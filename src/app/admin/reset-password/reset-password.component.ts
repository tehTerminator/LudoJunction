import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SqlRequest, SqlResponse } from '../../shared/collection';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup; 
  userName: string;
  pageState = PageState.ASK_PASSWORD;
  loading = false;
  readonly ASK_PASSWORD = PageState.ASK_PASSWORD;
  readonly SHOW_PREVIEW = PageState.SHOW_PREVIEW;
  readonly SHOW_RESULT = PageState.SHOW_RESULT;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      mobile: ['', Validators.pattern('^[6-9][0-9]{9}$'), this.validatorMobile.bind(this)],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    const mobile = this.mobile.value;
    const req: SqlRequest = {
      andWhere: { mobile }
    };

    this.http.post(environment.url.user.select, req)
    .subscribe((response: SqlResponse) => {
      this.loading = false;
      if (response.status) {
        if (response.data.length === 1) {
          this.userName = response.data[0].title;
          this.pageState = PageState.SHOW_PREVIEW;
        } else {
          this.snackBar.open('Invalid Mobile Number', 'DISMISS', {duration: 5000});
        }
      }
    });
  }

  onChangePassword(): void {
    // this.http.post()
    const mobile = this.mobile.value;
    const password = this.password.value;
    this.loading = true;

    this.http.post(environment.url.user.reset, {mobile, password})
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      if (res.status) {
        this.snackBar.open('Successfully Changed Password', 'DISMISS', {duration: 5000});
        this.pageState = PageState.SHOW_PREVIEW;
      } else {
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
      }
    })
  }

  validatorMobile(control: FormControl): Promise<ValidationErrors|null> | Observable<ValidationErrors|null>{
		const promise = new Promise<ValidationErrors | null>((resolve, rejects) => {
      const mobile = control.value;
			this.http.post(environment.url.user.select, { andWhere: { mobile } })
				.subscribe((res: SqlResponse) => {
					if (res.data.length > 0) {
						resolve(null);
					} else {
						const error: ValidationErrors = { mobileNotAvailable: true }
						resolve(error);
					}
				})
		});
		return promise;
	}

  get mobile(): FormControl {
    return this.resetForm.get('mobile') as FormControl;
  }

  get password(): FormControl {
    return this.resetForm.get('password') as FormControl;
  }

}


enum PageState {
  ASK_PASSWORD,
  SHOW_PREVIEW,
  SHOW_RESULT
};
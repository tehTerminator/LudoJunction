import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { SqlResponse } from '../../../shared/collection';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {
 	payInForm: FormGroup;
	image: string;
  loading = false;
  @ViewChild('screenShot') screenShot: ElementRef;

  constructor(
    private clipboard: Clipboard,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private router: Router,
		private fb: FormBuilder
  ) { }

  ngOnInit(): void {
		this.payInForm = this.fb.group({
			amount: [100, [Validators.required, Validators.min(100)]],
			payee: [{value: '8770549939', disabled: true}, Validators.required],
			screenshot: ['', Validators.required]
		});
  }

  onImageSelected() {
    const file = this.screenShot.nativeElement.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const b64 = reader.result;
        this.image = b64.toString();
    };
    try{
      reader.readAsDataURL(file);
    } catch (e) {
      return;
    }
  }

  onSubmit() {
		if (this.payInForm.invalid) {
			this.snackBar.open('Invalid Form Data', 'DISMISS', {duration: 2000});
			return;
		}

    this.loading = true;
    const request = {
      amount: this.amount.value,
      screenshot: this.image
    };
    this.http.post(environment.url.balance.payin, request)
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      console.log(res);
      this.snackBar.open(res.message[0], 'DIMISS', {duration: 5000});
      if (res.status) {
        this.router.navigate(['/player', 'dashboard', 'balance']);
      } 
    })
  }

	onCopy() {
		this.snackBar.open('Copied to Clipboard', 'DISMISS', {duration: 2000});
	}

	get amount(): FormControl {
		return this.payInForm.get('amount') as FormControl;
	}

	get payee(): FormControl {
		return this.payInForm.get('payee') as FormControl;
	}

	get screenshot(): FormControl {
		return this.payInForm.get('screenshot') as FormControl;
	}

}

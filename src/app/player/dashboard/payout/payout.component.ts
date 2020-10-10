import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { SqlResponse } from '../../../shared/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent implements OnInit {
  payoutForm: FormGroup;
  loading = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.payoutForm = new FormGroup({
      amount: new FormControl(0, [Validators.required, Validators.min(10)]),
      agree: new FormControl(false, Validators.requiredTrue)
    });
  }

  onSubmit() { 
    if (this.amount.invalid) {
      return;
    } 
    this.loading = true;

    this.http.post(environment.url.balance.payout, {amount: this.amount.value})
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
      if (res.status) {
        this.router.navigate(['/player', 'dashboard', 'balance']);
      }
    })
  }

  get amount(): FormControl {
    return this.payoutForm.get('amount') as FormControl;
  }

  get agree(): FormControl {
    return this.payoutForm.get('agree') as FormControl;
  }

}

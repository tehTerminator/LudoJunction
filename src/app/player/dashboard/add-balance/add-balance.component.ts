import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { SqlResponse } from '../../../shared/collection';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {
  amount: FormControl;
  image: string;
  @ViewChild('screenShot') screenShot: ElementRef;

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.amount = new FormControl('100', [Validators.required, Validators.min(100)]);
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
    const request = {
      amount: this.amount.value,
      screenshot: this.image
    };
    this.http.post(environment.url.balance.payin, request)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      this.snackBar.open(res.message[0], 'DIMISS', {duration: 5000});
      if (res.status) {
        this.router.navigate(['/player', 'dashboard', 'balance']);
      } 
    })
  }

}

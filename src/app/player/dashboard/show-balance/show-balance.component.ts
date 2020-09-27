import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/auth.service';
import { MINUTE, SqlResponse } from '../../../shared/collection';

@Component({
  selector: 'app-show-balance',
  templateUrl: './show-balance.component.html',
  styleUrls: ['./show-balance.component.css']
})
export class ShowBalanceComponent implements OnInit {
  balance = 0;
  allowRefresh = true;

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.allowRefresh = false;
    this.http.get(environment.url.balance.view)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.status) {
        this.balance = +res.data[0].balance;
      } else {
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000})
      }
    });

    setTimeout(() => {this.allowRefresh = true}, MINUTE);
  }

}

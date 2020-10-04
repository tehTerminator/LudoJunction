import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { MINUTE, SqlResponse } from '../../../shared/collection';

@Component({
  selector: 'app-show-balance',
  templateUrl: './show-balance.component.html',
  styleUrls: ['./show-balance.component.css']
})
export class ShowBalanceComponent implements OnInit, OnDestroy {
  balance = 0;
  allowRefresh = true;
  loading = false;
  timer = null;

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  onRefresh() {
    this.loading = true;
    this.allowRefresh = false;
    this.http.get(environment.url.balance.view)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      this.loading = false;
      if (res.status) {
        this.balance = +res.data[0].balance;
      } else {
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000})
      }
    });

    this.timer = setTimeout(() => {this.allowRefresh = true}, MINUTE);
  }

}

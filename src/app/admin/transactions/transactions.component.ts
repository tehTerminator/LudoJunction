import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionData } from '../../player/transactions/transaction.model';
import { environment } from '../../../environments/environment';
import { SqlResponse } from '../../shared/collection';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [DatePipe]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  theDate: string;
  constructor(
    private http: HttpClient,
    private as: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.onRefresh();
    this.theDate = this.datePipe.transform(new Date(), 'yyyy-mm-dd');
    console.log(this.theDate);
  }

  onRefresh() {
    this.http.post(environment.url.transaction, {date: this.theDate})
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        this.transactions = [];
        res.data.forEach((t: TransactionData) => {
          this.transactions.push(new Transaction(t, this.as.userId));
        });
        console.log(this.transactions);
      }
    })
  }
}

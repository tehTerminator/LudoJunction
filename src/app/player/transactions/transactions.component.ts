import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/auth.service';
import { SqlResponse } from '../../shared/collection';
import { Transaction, TransactionData } from './transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  constructor(private http: HttpClient, private as: AuthService) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.http.get(environment.url.transaction)
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
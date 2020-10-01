import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { SqlObject, SqlResponse, PaymentRequest, State } from '../../shared/collection';

@Component({
  selector: 'app-approve-pay-in',
  templateUrl: './approve-pay-in.component.html',
  styleUrls: ['./approve-pay-in.component.css']
})
export class ApprovePayInComponent implements OnInit {
  request: PaymentRequest;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onRefresh(): void {
    this.http.get(environment.adminUrls.payRequest.get)
    .subscribe((res: SqlResponse) => {
      if (res.status && res.data.length >= 1) {
        this.setRequest(res.data[0]);
      } else {
        this.request = null;
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
      }
    })
  }

  private setRequest(item: SqlObject) {
    this.request = {
      id: +item.id,
      userId: +item.userId,
      requestType: item.requestType,
      postedOn: new Date(item.postedOn),
      amount: +item.amount,
      state: State[item.state],
      screenshot: item.screenshot,
      comment: item.comment,
      userTitle: item.userTitle,
      mobile: item.mobile
    };
  }

  onApprove = () => this.onUpdateReq(this.request.id, 'ACCEPTED');
  onReject = () => this.onUpdateReq(this.request.id, 'REJECTED');

  private onUpdateReq(id: number, state: string) {
    this.http.post(
      environment.adminUrls.payRequest.post,
      {id, state }
    )
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        this.onRefresh();
        this.snackBar.open('Approved Success', 'DISMISS', {duration: 5000});
      } else {
        this.snackBar.open('Failed to Update', 'TRY AGAIN', {duration: 5000});
      }
    });
  }

}
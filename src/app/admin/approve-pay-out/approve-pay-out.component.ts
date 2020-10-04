import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { SqlObject, SqlResponse, PaymentRequest, State } from '../../shared/collection';

@Component({
  selector: 'app-approve-pay-out',
  templateUrl: './approve-pay-out.component.html',
  styleUrls: ['./approve-pay-out.component.css']
})
export class ApprovePayOutComponent implements OnInit {
  request: PaymentRequest;
  comment: string;
  loading = false;
  @ViewChild('screenshot') screenshot: ElementRef;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.comment ='';
    this.onRefresh();
  }

  onRefresh(): void {
    this.loading = true;
    this.http.get(environment.adminUrls.payRequest.get + '?req=PAYOUT')
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      console.log(res);
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
    const reqType = 'PAYOUT';
    this.loading = true;
    const screenshot = this.request.screenshot;
    const comment = this.comment;

    this.http.post(
      environment.adminUrls.payRequest.post,
      {id, state, reqType, screenshot, comment }
    )
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      console.log(res);
      if (res.status) {
        this.onRefresh();
        this.snackBar.open('Approved Success', 'DISMISS', {duration: 5000});
      } else {
        this.snackBar.open('Failed to Update', 'TRY AGAIN', {duration: 5000});
      }
    });
  }

  onImageSelected() {
    const file = this.screenshot.nativeElement.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const b64 = reader.result;
        this.request.screenshot = b64.toString();
    };
    try{
      reader.readAsDataURL(file);
    } catch (e) {
      return;
    }
  }

}

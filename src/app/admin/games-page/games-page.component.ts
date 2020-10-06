import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SqlRequest, Challenge, SqlResponse, SqlObject, State } from '../../shared/collection';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  challenge: Challenge;
  loading = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.loading = true;
    const request: SqlRequest = {
      columns: [
        'challenges.id',
        'challenges.sender',
        'challenges.receiver',
        'challenges.amount',
        'challenges.room',
        'challenges.state',
        'challenges.postedOn',
        'challenges.winner',
        'challenges.screenshot',
        'u1.title as stitle',
        'u2.title as rtitle'
      ],
      andWhere: {
        'challenges.state': 'COMPLETED'
      },
      leftJoin: "users AS u1 on u1.id = challenges.sender LEFT JOIN users as u2 on u2.id = challenges.receiver",
      limit: '1'
    }

    this.http.post(environment.adminUrls.challenges.get, request)
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      console.log(res);
      if (res.status && res.data.length === 1) {
        this.setChallenge(res.data[0]);
      } else {
        this.challenge = null;
      }
    });
  }

  private setChallenge(item: SqlObject) {
    this.challenge = {
      id: +item.id,
      sender: +item.sender,
      receiver: +item.receiver,
      amount: +item.amount,
      room: item.room,
      state: State[item.state],
      postedOn: new Date(item.postedOn),
      stitle: item.stitle,
      rtitle: item.rtitle,
      winner: +item.winner,
      winnerName: +item.winner === +item.sender ? item.stitle : item.rtitle,
      screenshot: item.screenshot
    }
  }

  onApprove = () => this.setState(this.challenge.id, 'APPROVE');
  onReject = () => this.setState(this.challenge.id, 'REJECT');

  private setState(id: number, state: string) {
    const confirmMessage = `Do You Really Want to ${state} Challenge #${id}`;
    const confirmRequest = confirm(confirmMessage);

    if (!confirmRequest) {
      return;
    }
    
    this.loading = true;
    this.http
    .post(environment.adminUrls.challenges.approve, {id, state})
      .subscribe((res: SqlResponse) => {
      this.loading = false;
        console.log(res);
      if (res.status) {
        this.onRefresh();
      }
      this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
    });
  }

}

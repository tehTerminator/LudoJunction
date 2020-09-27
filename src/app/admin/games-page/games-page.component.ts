import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SqlRequest, Challenge, SqlResponse, SqlObject, State } from '../../shared/collection';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  challenge: Challenge;
  private timer = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
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
      // screenshot: item.screenshot,
      screenshot: `http://localhost:80/ludoJunction/${item.screenshot.substr(3)}`
    }
  }

}

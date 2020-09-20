import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Challenge, MINUTE, SqlObject, SqlResponse, State } from '../shared/collection';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService implements OnDestroy {
  challenges: BehaviorSubject<Challenge[]> = new BehaviorSubject([]);
  ticker = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.ticker = setTimeout(() => this.onRefresh(), MINUTE);
    this.onRefresh();
  }

  onRefresh() {
    this.http.get(environment.url.challenge.get)
    .subscribe((res: SqlResponse) => {
      const newList: Challenge[] = [];
      res.data.forEach((item: SqlObject) => {
        newList.push({
          id: +item.id,
          sender: +item.sender,
          receiver: +item.receiver,
          amount: +item.amount,
          room: item.room,
          state: State[item.state],
          postedOn: new Date(item.postedOn)
        })
      });
      this.challenges.next(newList);
    });
  }

  onAdd(amount: number) {
    const url = environment.url.challenge.create
    this.http.post(url, {amount})
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        const gr: Challenge = {
          id: res.lastInsertId,
          sender: this.authService.userId,
          amount: amount,
          state: State.PENDING,
          postedOn: new Date()
        }
        const newGameRequest = [...this.challenges.value, gr]
        this.challenges.next(newGameRequest);
      } else {
        console.log(res);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }
}

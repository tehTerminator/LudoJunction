import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Challenge, MINUTE, SqlObject, SqlRequest, SqlResponse, State } from '../shared/collection';
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
          postedOn: new Date(item.postedOn),
          stitle: item.stitle,
          rtitle: item.rtitle
        })
      });
      console.log(newList);
      this.challenges.next(newList);
    });
  }

  onCreate(amount: number) {
    const url = environment.url.challenge.create
    this.http.post(url, {amount})
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.status) {
        const gr: Challenge = {
          id: res.lastInsertId,
          sender: this.authService.userId,
          amount: amount,
          state: State.PENDING,
          postedOn: new Date(),
          stitle: this.authService.user.value.title
        }
        const newGameRequest = [...this.challenges.value, gr]
        this.challenges.next(newGameRequest);
      } else {
        console.log(res);
      }
    });
  }

  onUpdate(req: SqlRequest) {
    this.http.post(environment.url.challenge.update, req)
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        this.onRefresh();
      }
    });
  }

  /**
   * @param id Challange Id
   * @param amount Challenge Amount
   */
  onAccept(id: number, amount: number) {
    const url = environment.url.challenge.accept;
    this.http.post(url, {id, amount})
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.status) {
        this.onRefresh();
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }
}

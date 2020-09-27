import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, empty } from 'rxjs';
import { Challenge, SECOND, SqlObject, SqlRequest, SqlResponse, State } from '../shared/collection';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';
import { PlayerModule } from './player.module';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ChallengeService implements OnDestroy {
  challenges: BehaviorSubject<Challenge[]> = new BehaviorSubject([]);
  ticker = null;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient, 
    private authService: AuthService) {

  }

  start() {
    this.ticker = setInterval(() => this.onRefresh(), SECOND * 30);
    this.onRefresh();
  }

  stop() {
    clearInterval(this.ticker);
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
          rtitle: item.rtitle,
          winner: +item.winner,
          screenshot: item.screenshot
        })
      });
      this.challenges.next(newList);
    });
  }

  onCreate(amount: number) {
    const url = environment.url.challenge.create
    this.http.post(url, {amount})
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        const gr: Challenge = {
          id: res.lastInsertId,
          sender: this.authService.userId,
          amount: amount,
          state: State.PENDING,
          postedOn: new Date(),
          stitle: this.authService.user.value.title,
          winner: 0
        }
        const newGameRequest = [...this.challenges.value, gr]
        this.challenges.next(newGameRequest);
      } 
    });
  }

  onUpdate(req: SqlRequest) {
    return this.http.post(environment.url.challenge.update, req)
    .pipe(tap((res: SqlResponse) => {
      if (res.status) {
        this.onRefresh();
      }
    }))
  }

  /**
   * @param id Challange Id
   * @param amount Challenge Amount
   */
  onAccept(id: number, amount: number) {
    const url = environment.url.challenge.accept;
    return this.http.post(url, {id, amount})
    .pipe(tap((res: SqlResponse) => {
      if (res.status) {
        this.onRefresh();
      }
    }));
  }

  /**
   * 
   * @param id Challenge Id
   */
  get(id: number): Challenge {
    return this.challenges.value.find(x=>x.id === id);
  }

  onPostResult(challenge: Challenge) {
    const request = {
      imageData: challenge.screenshot,
      id: challenge.id,
      amount: challenge.amount,
    };
    const url = environment.url.challenge.result;
    return this.http.post(url, request);
  }

  onReject(id: number) {
    const challenge = this.challenges.value.find( x => x.id === id);
    if (challenge.sender === this.authService.userId) {
      this.http.post(environment.url.challenge.reject, {id})
      .subscribe((res: SqlResponse) => {
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
        if (res.status) {
          this.onRefresh();
        }
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }
}

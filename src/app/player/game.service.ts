import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameRequest, MINUTE, SqlResponse, State } from '../shared/collection';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {
  games: BehaviorSubject<GameRequest[]> = new BehaviorSubject([]);
  ticker = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.ticker = setTimeout(() => this.onRefresh(), MINUTE);
    this.onRefresh();
  }

  onRefresh() {
    this.http.get(environment.url.games.get)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      this.games.next(res.data);
    });
  }

  onAdd(amount: number) {
    const url = environment.url.games.create
    this.http.post(url, {amount})
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        const gr: GameRequest = {
          id: res.lastInsertId,
          sender: this.authService.userId,
          amount: amount,
          state: State.PENDING,
          postedOn: new Date()
        }
        const newGameRequest = [...this.games.value, gr]
        this.games.next(newGameRequest);
      } else {
        console.log(res);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }
}

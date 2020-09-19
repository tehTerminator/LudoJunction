import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameRequest, MINUTE, SqlResponse } from '../shared/collection';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {
  gameRequest: BehaviorSubject<GameRequest[]> = new BehaviorSubject(null);
  user: User;
  userSubscription: Subscription;
  ticker = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userSubscription = this.authService.user.subscribe((user: User) => this.user = user);
    this.ticker = setTimeout(() => this.onRefresh(), MINUTE);
  }

  onRefresh() {
    this.http.get(environment.url.games)
    .subscribe((res: SqlResponse) => {
      this.gameRequest.next(res.data);
    });
  }

  get myGames(): GameRequest[] {
    return this.gameRequest.getValue().filter(
      (x: GameRequest) => +x.sender === this.user.id
    );
  }

  get availableGames(): GameRequest[] {
    return this.gameRequest.getValue().filter(
      (x: GameRequest) => +x.sender != this.user.id
    );
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
    this.userSubscription.unsubscribe();
  }
}

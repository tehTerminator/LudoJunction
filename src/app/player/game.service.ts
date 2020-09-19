import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameRequest } from '../shared/collection';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {
  gameRequest: BehaviorSubject<GameRequest[]> = new BehaviorSubject(null);
  ticker = null;

  constructor(private http: HttpClient) { }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }
}

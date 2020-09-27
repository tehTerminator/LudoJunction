import { Component, OnDestroy, OnInit } from '@angular/core';
import { Challenge, MINUTE, SECOND, SqlObject, SqlResponse, State } from '../../shared/collection';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private challenges: Challenge[] = [];
  private timer = null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onRefresh();
    this.timer = setInterval(() => this.onRefresh(), MINUTE);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  onRefresh() {
    this.http.get(environment.adminUrls.challenges.get)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.status) {
        this.challenges = [];
        res.data.forEach((item: SqlObject) => {
          this.challenges.push({
            id: +item.id,
            amount: +item.amount,
            state: State[item.state]
          });
        });
      } else {
        this.snackBar.open('Unable to Fetch Information', 'DISMISS', {duration: 5 * SECOND});
      }
    });
  }

  get activeGames(): Challenge[] {
    return this.filteredChallenges('state', State.ACTIVE);
  }

  get pendingGames(): Challenge[] {
    return this.filteredChallenges('state', State.PENDING);
  }

  get totalActiveAmount(): number {
    return this.getTotal(this.activeGames);
  }

  get totalPendingAmount(): number {
    return this.getTotal(this.pendingGames);
  }

  private filteredChallenges(key: string, value: State | string | number) {
    return this.challenges.filter(x=>x[key] === value);
  }

  private getTotal(challenges: Challenge[]): number {
    let total = 0;
    challenges.forEach((item: Challenge) => {
      total += item.amount;
    });
    return total;
  }
}

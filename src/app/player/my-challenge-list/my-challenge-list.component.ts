import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../shared/auth.service';
import { Challenge } from '../../shared/collection';
import { ChallengeService} from '../challenge.service';

@Component({
  selector: 'app-my-challenge-list',
  templateUrl: './my-challenge-list.component.html',
  styleUrls: ['./my-challenge-list.component.css']
})
export class MyChallengeListComponent implements OnInit, OnDestroy {
  challenges: Challenge[];
  private sub: Subscription;

  constructor(private cs: ChallengeService, private as: AuthService) { }

  ngOnInit(): void {
    this.sub = this.cs.challenges
    .pipe(map(x => x.filter(c => +this.as.userId === c.sender)))
    .subscribe(c => this.challenges = c);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

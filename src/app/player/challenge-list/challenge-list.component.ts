import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/auth.service';
import { Challenge, State } from '../../shared/collection';
import { ChallengeService } from '../challenge.service';
import {
	trigger,
	style,
	state,
	animate,
	transition
} from '@angular/animations'

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css'],
	animations: [
		trigger('item', [
			state('in', style({
				opacity: 1
			})),
			transition('void=>*', [
				style({
					opacity: 0.1,
					transform: 'translateX(-100px) translateY(-30px)'
				}),
				animate('1s')
			])
		])
	]
})
export class ChallengeListComponent implements OnInit, OnDestroy {
  challenges: Challenge[];
  sub: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.challengeService.challenges
    .pipe(
      map(x => x.filter(
        c => (c.state === State.PENDING) && (![c.sender, c.receiver].includes(this.as.userId))
      )
    ))
    .subscribe({
      next: (challenges: Challenge[]) => this.challenges = challenges
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

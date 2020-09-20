import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Challenge } from '../../shared/collection';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[];
  sub: Subscription;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.sub = this.challengeService.challenges.subscribe({
      next: (challenges: Challenge[]) => this.challenges = challenges
    });
  }

}

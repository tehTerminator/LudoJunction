import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChallengeService } from './challenge.service';
@Component({
  selector: 'app-player',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class PlayerComponent implements OnInit, OnDestroy{

  constructor(private cs: ChallengeService) { }

  ngOnInit() {
    this.cs.start();
  }

  ngOnDestroy() {
    this.cs.stop();
  }
}

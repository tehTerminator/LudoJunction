import { Component, OnInit } from '@angular/core';
import { ChallengeService } from './challenge.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  constructor(private cs: ChallengeService) { }

  ngOnInit() {
    this.cs.onRefresh();
  }
}

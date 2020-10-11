import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private cs: ChallengeService) { }

  ngOnInit(): void {
    this.cs.onRefresh();
  }

}

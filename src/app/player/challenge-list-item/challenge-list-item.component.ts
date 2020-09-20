import { Component, OnInit, Input } from '@angular/core';
import { Challenge, State } from '../../shared/collection';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-challenge-list-item',
  templateUrl: './challenge-list-item.component.html',
  styleUrls: ['./challenge-list-item.component.css']
})
export class ChallengeListItemComponent implements OnInit {
  @Input challenge: Challenge;
  constructor(private as: AuthService) { }

  ngOnInit(): void {
  }

  isMine() {
    return ((+this.challenge.sender) - this.as.userId) === 0;
  }

  showAcceptBtn() {
    if ( this.isMine() ) {
      return false;
    } else {
      if( this.challenge.state === State.)
    }
  }
}

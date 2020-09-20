import { Component, OnInit, Input } from '@angular/core';
import { Challenge, State } from '../../shared/collection';
import { AuthService } from '../../shared/auth.service';
import { FormControl } from '@angular/forms';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-challenge-list-item',
  templateUrl: './challenge-list-item.component.html',
  styleUrls: ['./challenge-list-item.component.css']
})
export class ChallengeListItemComponent implements OnInit {
  @Input() challenge: Challenge;
  roomCode: FormControl;
  constructor(
    private as: AuthService,
    private cs: ChallengeService
  ) { }

  ngOnInit(): void {
    this.roomCode = new FormControl();
  }

  isMine() {
    return this.challenge.sender === this.as.userId
  }

  showAcceptBtn() {
    if ( this.isMine() ) {
      return false;
    } else {
      return this.challenge.state === State.PENDING;
    }
  }

  showRoomInput() {
    return (this.challenge.state === State.ACCEPTED);
  }
  
  isActive() {
    return this.challenge.state === State.ACTIVE;
  }

  onSaveRoom() {
    this.cs.onUpdate({
      andWhere: {id: this.challenge.id},
      userData: {room: this.roomCode.value, state: State[State.ACTIVE]}
    });
  }

  onAccept = () => this.cs.onAccept(this.challenge.id, this.challenge.amount);
}

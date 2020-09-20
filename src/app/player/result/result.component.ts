import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Challenge } from '../../shared/collection';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  id: number;
  challenge: Challenge;
  @ViewChild('imageField') imageField: ElementRef;
  result: FormControl;

  constructor(
    private as: AuthService,
    private route: ActivatedRoute,
    private cs: ChallengeService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.challenge = this.cs.get(this.id);
    this.result = new FormControl();
  }

  onImageSelected() {
    const file = this.imageField.nativeElement.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const b64 = reader.result;
        this.setImage(b64.toString());
    };
    reader.readAsDataURL(file);
}

  setImage(imgData: string) {
    this.challenge.screenshot = imgData;
  }

  onSubmit() {
    const gameResult = this.result.value;
    let winner = 0;
    if (gameResult === 'WIN') {
      winner = this.as.userId;
    } else {
      if (this.as.userId === this.challenge.receiver) {
        winner = this.challenge.sender;
      } else {
        winner = this.challenge.receiver;
      }
    }
    this.cs.onPostResult(this.challenge, winner);
  }

}

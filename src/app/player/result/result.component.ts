import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Challenge, SqlRequest, SqlResponse } from '../../shared/collection';
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
    private cs: ChallengeService,
    private router: Router
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
    this.cs.onPostResult(this.challenge)
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        this.router.navigate(['/player']);
      }
    })
  }
}

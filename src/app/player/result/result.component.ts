import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading = false;

  constructor(
    private as: AuthService,
    private route: ActivatedRoute,
    private cs: ChallengeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.challenge = this.cs.get(this.id);
    this.result = new FormControl();

    if (this.challenge === undefined) {
      this.snackBar.open('Result Already Posted', 'DISMISS', {duration: 2000});
      this.router.navigate(['/player']);
    }
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
    this.loading = true;
    this.cs.onPostResult(this.challenge)
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      console.log(res);
      if (res.status) {
        this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
        this.router.navigate(['/player']);
      }
    })
  }
}

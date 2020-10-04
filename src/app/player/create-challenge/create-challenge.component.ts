import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SqlResponse } from '../../shared/collection';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {
  createGameForm: FormGroup;
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private challengeService: ChallengeService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createGameForm = this.fb.group({
      amount: [10, [Validators.required, Validators.min(10)]]
    });
  }

  onSubmit() {
    this.loading = true;
    const amount = +this.createGameForm.get('amount').value;
    this.challengeService.onCreate(amount)
    .subscribe((res: SqlResponse) => {
      this.loading = false;
      this.snackBar.open(res.message[0], 'DISMISS', {duration: 5000});
    })
  }

  get amount(): FormControl {
    return this.createGameForm.get('amount') as FormControl;
  }
}

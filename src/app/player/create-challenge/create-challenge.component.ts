import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {
  createGameForm: FormGroup;

  constructor(private challengeService: ChallengeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createGameForm = this.fb.group({
      amount: [10, [Validators.required, Validators.min(10)]]
    });
  }

  onSubmit() {
    const amount = +this.createGameForm.get('amount').value;
    this.challengeService.onCreate(amount);
  }

  get amount(): FormControl {
    return this.createGameForm.get('amount') as FormControl;
  }
}

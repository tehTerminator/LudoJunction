import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      amount: [10, Validators.required]
    });
  }

  onSubmit() {
    const amount = +this.createGameForm.get('amount').value;
    this.challengeService.onAdd(amount);
  }
}

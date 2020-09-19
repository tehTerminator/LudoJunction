import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  createGameForm: FormGroup;

  constructor(private gameService: GameService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createGameForm = this.fb.group({
      amount: [10, Validators.required]
    });
  }

  onSubmit() {
    const amount = +this.createGameForm.get('amount').value;
    this.gameService.onAdd(amount);
  }
}

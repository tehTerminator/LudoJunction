import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {
  private id: number;
  activationForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id);

    this.activationForm = this.fb.group({
      otp: ['', Validators.required, Validators.minLength(8), Validators.maxLength(8)]
    });
  }

}

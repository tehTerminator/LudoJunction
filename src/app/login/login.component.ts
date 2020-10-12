import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
	animations: [
		trigger('card', [
			state('in', style({
				opacity: 1
			})),
			transition('void=>*', [
				style({
					transform: 'translateY(1000px)',
					opacity: 0.1
				}),
				animate('1s')
			])
		])
	]
})
export class LoginComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {

  }

}

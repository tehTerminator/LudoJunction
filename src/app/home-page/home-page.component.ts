import { Component, OnInit } from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
	animations: [
		trigger('mainCard', [
			state('in', style({
				opacity: 1
			})),
			transition('void=>*', [
				style({
					opacity: 0.1,
					transform: 'translateY(-300px)'
				}),
				animate('1.5s')
			])
		])
	]
})
export class HomePageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}

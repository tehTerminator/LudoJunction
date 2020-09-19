import { Component, OnInit } from '@angular/core';
import { GameRequest } from './../shared/collection';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  gameRequests: Array<GameRequest> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameRequest } from './../shared/collection';
import { GameService } from './game.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  constructor() { }
}

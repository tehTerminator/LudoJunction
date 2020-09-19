import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRequest } from '../../shared/collection';
import { GameService } from '../game.service';

@Component({
  selector: 'app-all-game-list',
  templateUrl: './all-game-list.component.html',
  styleUrls: ['./all-game-list.component.css']
})
export class AllGameListComponent implements OnInit {
  games: GameRequest[];
  gameSub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameSub = this.gameService.games.subscribe({
      next: (games: GameRequest[]) => this.games = games
    });
  }

}

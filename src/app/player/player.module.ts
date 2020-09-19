import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { AllGameListComponent } from './all-game-list/all-game-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameListItemComponent } from './game-list-item/game-list-item.component';


@NgModule({
  declarations: [PlayerComponent, DashboardComponent, ResultComponent, TransactionsComponent, CreateGameComponent, AllGameListComponent, GameListItemComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlayerModule { }

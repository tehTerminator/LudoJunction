import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengeListItemComponent } from './challenge-list-item/challenge-list-item.component';


@NgModule({
  declarations: [PlayerComponent, DashboardComponent, ResultComponent, TransactionsComponent, CreateChallengeComponent, ChallengeListComponent, ChallengeListItemComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlayerModule { }

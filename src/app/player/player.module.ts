import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [PlayerComponent, DashboardComponent, TransactionsComponent, ResultComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }

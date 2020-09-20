import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChallengeResultPageComponent } from './challenge-result-page/challenge-result-page.component';

const routes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'result/:id', component: ResultComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'result/:id', component: ChallengeResultPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }

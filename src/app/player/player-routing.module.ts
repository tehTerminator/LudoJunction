import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { ResultComponent } from './result/result.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChallengeResultPageComponent } from './challenge-result-page/challenge-result-page.component';
import { PlayComponent } from './play/play.component';
import { ReferEarnPageComponent } from './refer-earn-page/refer-earn-page.component';

const routes: Routes = [
  { path: '', component: PlayerComponent, children: [
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule) },
    { path: 'play', component: PlayComponent },
    { path: 'result/:id', component: ResultComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'result/:id', component: ChallengeResultPageComponent },
		{ path: 'refer', component: ReferEarnPageComponent },
    { path: '**', redirectTo: 'play', pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }

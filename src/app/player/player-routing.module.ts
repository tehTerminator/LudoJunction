import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';

const routes: Routes = [{ path: '', component: PlayerComponent, children: [
				{ path: 'dashboard', component: DashboardComponent },
				{ path: 'result', component: ResultComponent },
				{ path: 'transactions', component: TransactionsComponent },
				{ path: '**', redirectTo: 'dashboard', pathMatch: 'full }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }

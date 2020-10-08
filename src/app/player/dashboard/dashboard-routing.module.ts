import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { DashboardComponent } from './dashboard.component';
import { ShowBalanceComponent } from './show-balance/show-balance.component';
import { PayoutComponent } from './payout/payout.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'balance', component: ShowBalanceComponent },
    { path: 'pay-in', component: AddBalanceComponent },
    { path: 'pay-out', component: PayoutComponent },
    { path: '**', redirectTo: 'balance', pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

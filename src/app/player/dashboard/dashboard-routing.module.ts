import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { DashboardComponent } from './dashboard.component';
import { ShowBalanceComponent } from './show-balance/show-balance.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'balance', component: ShowBalanceComponent },
    { path: 'requestChips', component: AddBalanceComponent },
    { path: '**', redirectTo: 'balance', pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

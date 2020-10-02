import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { ApprovePayInComponent } from './approve-pay-in/approve-pay-in.component';
import { ApprovePayOutComponent } from './approve-pay-out/approve-pay-out.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'approveGames', component: GamesPageComponent,
      },
      {
        path: 'pay-in', component: ApprovePayInComponent,
      },
      {
        path: 'pay-out', component: ApprovePayOutComponent,
      },
      {
        path: 'transactions', component: TransactionsComponent,
      },
      {
        path: '**', redirectTo: 'dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoCardComponent } from './dashboard/info-card/info-card.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { ApprovePayInComponent } from './approve-pay-in/approve-pay-in.component';
import { ApprovePayOutComponent } from './approve-pay-out/approve-pay-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransactionsComponent } from './transactions/transactions.component';
import { MatButtonModule } from '@angular/material/button';
import { ApprovePageComponent } from './approve-page/approve-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [AdminComponent, DashboardComponent, InfoCardComponent, GamesPageComponent, ApprovePayInComponent, ApprovePayOutComponent, TransactionsComponent, ApprovePageComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AdminModule { }

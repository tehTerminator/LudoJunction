import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ShowBalanceComponent } from './show-balance/show-balance.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";
import { PayoutComponent } from './payout/payout.component';

@NgModule({
    declarations: [DashboardComponent, ShowBalanceComponent, AddBalanceComponent, PayoutComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class DashboardModule { }
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ShowBalanceComponent } from './show-balance/show-balance.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PayoutComponent } from './payout/payout.component';
import { ClipboardModule } from "@angular/cdk/clipboard";

@NgModule({
    declarations: [DashboardComponent, ShowBalanceComponent, AddBalanceComponent, PayoutComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        ClipboardModule,
        FormsModule
    ]
})
export class DashboardModule { }
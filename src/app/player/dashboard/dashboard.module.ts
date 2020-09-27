import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ShowBalanceComponent } from './show-balance/show-balance.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';

@NgModule({
    declarations: [DashboardComponent, ShowBalanceComponent, AddBalanceComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
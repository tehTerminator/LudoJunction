import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ShowBalanceComponent } from './show-balance/show-balance.component';

@NgModule({
    declarations: [DashboardComponent, ShowBalanceComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
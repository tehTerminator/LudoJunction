import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { ResultComponent } from './result/result.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengeListItemComponent } from './challenge-list-item/challenge-list-item.component';
import { MyChallengeListComponent } from './my-challenge-list/my-challenge-list.component';
import { ChallengeResultPageComponent } from './challenge-result-page/challenge-result-page.component';
import { ChallengeService } from './challenge.service';
import { PlayComponent } from './play/play.component';


@NgModule({
  declarations: [
    PlayerComponent,
    ResultComponent, 
    TransactionsComponent, 
    CreateChallengeComponent, 
    ChallengeListComponent, 
    ChallengeListItemComponent,
    MyChallengeListComponent,
    ChallengeResultPageComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ChallengeService]
})
export class PlayerModule { }

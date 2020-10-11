import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
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
import { MatButtonModule } from '@angular/material/button';
import { ReferEarnPageComponent } from './refer-earn-page/refer-earn-page.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';


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
    PlayComponent,
    ReferEarnPageComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ClipboardModule,
    MatIconModule
  ],
  providers: [ChallengeService]
})
export class PlayerModule { }

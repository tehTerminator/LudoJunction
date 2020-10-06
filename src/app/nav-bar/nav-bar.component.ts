import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { UserType } from '../shared/collection';
import { User } from '../shared/user.model';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '58px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit, OnDestroy {
  title = 'Ludo Junction';
  navbarCollapsed = true;
  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => this.user = user);
  }

  onLogout = () => this.authService.signOut();

  toggleNavBar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get isAdmin(): boolean {
    return this.authService.userType === UserType.ADMINISTRATOR;
  }

  get isPlayer(): boolean {
    return this.authService.userType === UserType.PLAYER;
  }

  get home(): Array<string> {
    if (this.isAdmin) {
      return ['/admin']
    } else if(this.authService.userType === UserType.PLAYER) {
      return ['/player']
    } else {
      return ['/login', 'signIn']
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

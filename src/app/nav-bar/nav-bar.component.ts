import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

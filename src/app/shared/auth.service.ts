import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, generate } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { SqlResponse, UserType } from './collection';
import { tap } from 'rxjs/operators';

interface UserData {
  id: number;
  title: string;
  username: string;
  token: string;
  generatedOn: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  private signOutTimer = null;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.autoSignIn();
  }

  public signIn(username: string, password: string) {
    const url = environment.url.user.signIn;
    return this.http.post(url, { username, password })
      .pipe(tap((response: SqlResponse) => {
        if (response.status && response.data.length === 1) {
          const userData = response.data[0];
          this.handleAuthentication(userData);
        }
      }));
  }

  private handleAuthentication(user: UserData) {
    const generatedOn = new Date(user.generatedOn).getTime();
    const now = (new Date()).getTime();

    if (now < generatedOn) {
      return;
    }


    localStorage.setItem('user', JSON.stringify(user));
    const currentUser = new User(
      user.id,
      user.title,
      user.username,
      user.token,
      generatedOn,
      UserType[user.type]
    );
    this.user.next(currentUser);
    const signOutAfter = now - generatedOn;
    this.signOutTimer = setTimeout(() => this.signOut(), signOutAfter);
  }

  signOut(): void {
    this.user.next(null);
    clearInterval(this.signOutTimer);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  signUp(title: string, email: string, password: string) {
    const url = environment.url.user.signUp;
    return this.http.post(url, { title, email, password })
    .pipe(tap((res: SqlResponse) => {
      console.log(res);
    }));
  }

  get userId(): number {
    return this.user.getValue().id;
  }

  private autoSignIn(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('user'));
    if (userData !== null) {
      this.handleAuthentication(userData);
    }
    this.router.navigate(['/player']);
  }

  ngOnDestroy() {
    clearInterval(this.signOutTimer);
  }

}

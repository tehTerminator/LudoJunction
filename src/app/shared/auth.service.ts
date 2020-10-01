import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { HOUR, SqlResponse, UserType } from './collection';
import { tap } from 'rxjs/operators';

interface UserData {
  id: string;
  title: string;
  mobile: string;
  email: string;
  token: string;
  generatedOn: string;
  isAdmin: string;
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
    const userType = user.isAdmin === "1" ? UserType.ADMINISTRATOR : UserType.PLAYER;
    const currentUser = new User(
      +user.id,
      user.title,
      user.mobile,
      user.token,
      generatedOn,
      userType
    );
    this.user.next(currentUser);
    const signOutAfter = HOUR - now + generatedOn;
    clearTimeout(this.signOutTimer);
    this.signOutTimer = setTimeout(() => this.signOut(), signOutAfter);
  }

  signOut(): void {
    this.user.next(null);
    clearInterval(this.signOutTimer);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  signUp(title: string, email: string, mobile: string, password: string) {
    const url = environment.url.user.signUp;
    return this.http.post(url, { title, email, mobile, password })
  }

  get userId(): number {
    let id: number;
    try {
      id = this.user.value.id;
    } catch(e) {
      id = 0;
    } finally{
      return id;
    }
  }

  get userType(): UserType {
    let type: UserType;
    try{
      type = this.user.value.type;
    } catch (e) {
      type = UserType.ANONYMOUS;
    } finally {
      return type;
    }
  }

  private autoSignIn(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('user'));
    if (userData !== null) {
      this.handleAuthentication(userData);
    } 
  }

  ngOnDestroy() {
    clearTimeout(this.signOutTimer);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { HOUR, MINUTE, SqlResponse, UserType } from './collection';
import { catchError, tap } from 'rxjs/operators';

interface UserData {
  id: string;
  title: string;
  mobile: string;
  token: string;
  generatedOn: string;
  isAdmin: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  private tokenTimer = null;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.autoSignIn();
  }

  public signIn(username: string, password: string) {
    const url = environment.url.user.signIn;
    return this.http.post(url, { username, password })
      .pipe(tap((response: SqlResponse) => {
        // console.log('Response Received', response)
        if (response.status && response.data.length === 1) {
          const userData = response.data[0];
          // console.log('response.status ===', response.status);
          this.handleAuthentication(userData);
        } 
      }),
      catchError(err => {
        // console.log(err);
        return err;
      }));
  }

  private handleAuthentication(user: UserData) {
    // console.log('handleAuthentication(user)', user);
    // -7 GMT to +530 GMT Arizona to IST
    // const generatedOn = new Date(user.generatedOn).getTime() + 12 * HOUR + 30 * MINUTE;
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
    // console.log('this.user.value', this.user.value);
    const signOutAfter = HOUR - now + generatedOn;
    clearTimeout(this.tokenTimer);
    this.tokenTimer = setTimeout(() => this.refreshToken(), signOutAfter);
  }

  private refreshToken() {
    this.http.get(environment.url.user.revalidate)
    .subscribe((res: SqlResponse) => {
      if (res.status) {
        const currentUser = this.user.value;
        currentUser.token = res.token;
        this.user.next(currentUser);
        clearTimeout(this.tokenTimer);
        this.tokenTimer = setTimeout(() => this.refreshToken(), HOUR - MINUTE * 5);
      } else {
        this.signOut();
        console.log('Token Expired');
      }
    });
  }

  signOut(): void {
    // console.log('Signing Out');
    this.user.next(null);
    clearInterval(this.tokenTimer);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  signUp(title: string, mobile: string, password: string, referrer: string) {
    const url = environment.url.user.signUp;
    return this.http.post(url, { title, mobile, password, referrer })
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
    clearTimeout(this.tokenTimer);
  }

}

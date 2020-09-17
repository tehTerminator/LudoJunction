import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { SqlResponse } from './collection';

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
export class AuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  private signOutTimer = null;

  constructor(
	private http: HttpClient, 
	private router: Router) { 
		this.autoSignIn();
	}

  public signIn(username: string, password: string) {
    this.http.post(environment.url.user.signIn, {username, password})
    .subscribe((response: SqlResponse<UserData>) => {
      if( response.status && response.data.length === 1 ) {
        const userData = response.data[0];
        this.authenticate(userData);
      }
    });
  }

  private authenticate(user: UserModel) {
	const generatedOn = new Date(user.generatedOn).getTime();
	localStorage.setItem('user', JSON.stringify(user));
	const currentUser = new User(
		user.id,
		user.title,
		user.username,
		user.token,
		generatedOn,
		user.typeÎ
	);
	this.user.next(currentUser);
	const now = (new Date()).getTime();
	const signOutAfter = now - generatedOn;
	signOutTimer = timeout(() => signOut(), signOutAfter);
  }

  private signOut(): void {
	this.user.next(null);
	localStorage.clear();
	this.router.navigate(['/login']);Î
  }

  private autoSignIn(): void {
	const userData: UserData = JSON.parse(localStorage.getItem('user'));
	if( userData !== null ) {
		this.handleAuthentication(userData);
	}
  }
}

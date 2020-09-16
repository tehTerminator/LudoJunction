import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { ADMINISTRATOR, PLAYER, SqlResponse } from './collection';

interface UserModel {
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

  constructor(private http: HttpClient) { }

  public signIn(username: string, password: string) {
    this.http.post(environment.url.user.signIn, {username, password})
    .subscribe((response: SqlResponse<UserModel>) => {
      if( response.status && response.data.length === 1 ) {
        const userData = response.data[0];
        this.authenticate(userData);
      }
    });
  }

  private authenticate(user: UserModel) {
    if( user.type === ADMINISTRATOR ) {
      // Do Somthing as Administrator;
    } else if( user.type === PLAYER ) {
      // Do Something as Player
    } 
  }
}

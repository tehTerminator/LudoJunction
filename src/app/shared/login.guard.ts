import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from './user.model';
import { UserType } from './collection';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean 
    | UrlTree 
    | Promise<boolean|UrlTree> 
    | Observable<boolean|UrlTree> {
        return this.authService.user.pipe(take(1), map(
            (user: User) => {
                const auth = !!user;
                if (auth) {
									console.log(auth);
									console.log(user.type);
										let link = [];
										switch(user.type){ 
											case UserType.ADMINISTRATOR: {
												link = ['/admin'];
												break;
											}
											case UserType.PLAYER: {
												link = ['/player'];
												break;
											}
											default: {
												link = ['/login'];
												break;
											}
										}
										console.log(link);
                    return this.router.createUrlTree(link);
								} 
                return true;
            }
        ))
    }
}


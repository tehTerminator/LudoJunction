import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
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
                    return true;
                } 
                return this.router.createUrlTree(['/login']);
            }
        ))
    }
}
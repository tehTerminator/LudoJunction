import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';
import { UserType } from '../shared/collection';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class PlayerGuard implements CanActivate {
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
                if (auth && user.type === UserType.PLAYER) {
                    return true;
                } else if (auth && user.type === UserType.ADMINISTRATOR) {
                    return this.router.createUrlTree(['/admin']);
                } else {
                    this.authService.signOut();
                    return this.router.createUrlTree(['/login']);
                }
            }
        ))
    }
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        this.authService.user.pipe(take(1))
        .subscribe((user: User) => {
            if (!!user) {
                request = request.clone({
                    setHeaders: {
                        Authorization: user.token
                    }
                });
            }
        });
        return next.handle(request);
    }
}
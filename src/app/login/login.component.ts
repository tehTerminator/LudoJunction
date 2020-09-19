import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.user
    // .pipe(take(1))
    // .subscribe((user: User) => {
    //   console.log(user);
    //   if (!!user) {
    //     console.log('User Logged In')
    //     this.router.navigate(['/player']);
    //   } else {
    //     console.log('User Not Logged In');
    //   }
    // });
  }

}

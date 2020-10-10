import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../../shared/user.model';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-refer-earn-page',
  templateUrl: './refer-earn-page.component.html',
  styleUrls: ['./refer-earn-page.component.css']
})
export class ReferEarnPageComponent implements OnInit {
	myMobile: string;
  constructor(
		private authService: AuthService,
	) { }

  ngOnInit(): void {
		this.authService.user
		.pipe(take(1))
		.subscribe((user: User) => {
			this.myMobile = user.mobile;
		});
  }

	get myReferalLink(): string {
		return `http://wa.me/?text=http://ludojunction.com/login/signUp?referrer=${this.myMobile}`;
	}

	get sharableLink(): string {
		return `http://ludojunction.com/login/signUp?referrer=${this.myMobile}`
	}

}

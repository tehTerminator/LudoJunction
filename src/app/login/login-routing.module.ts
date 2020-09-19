import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{
		path: '', component: LoginComponent, children:
			[
				{ path: 'signIn', component: SignInComponent },
				{ path: 'signUp', component: SignUpComponent },
				{ path: '**', redirectTo: 'signIn', pathMatch: 'full' },
			],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule { }

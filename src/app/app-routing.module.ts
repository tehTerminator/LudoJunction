import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { TermsPageComponent } from './terms-page/terms-page.component';


const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  }, 
  { 
    path: 'player', 
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule),
    canActivate: [AuthGuard] 
  }, 
  {
    path: 'terms',
    component: TermsPageComponent
  },
  { path: '**', redirectTo: '/login/signIn', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

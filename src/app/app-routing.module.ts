import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerGuard } from './player/player.guard';
import { AdminGuard } from './admin/admin.guard';
import { LoginGuard } from './shared/login.guard';
import { TermsPageComponent } from './terms-page/terms-page.component';


const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
		canActivate: [LoginGuard]
  }, 
  { 
    path: 'player', 
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule),
    canActivate: [PlayerGuard] 
  }, 
  {
    path: 'terms',
    component: TermsPageComponent
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '/login/signIn', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

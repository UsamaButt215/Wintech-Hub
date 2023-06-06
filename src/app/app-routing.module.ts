import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RechargeScreenComponent } from './recharge-screen/recharge-screen.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./mainlayout/mainlayout.module').then(m => m.MainlayoutModule) },
  { path: 'login', component: LoginComponent },
  { path: 'recharge', component: RechargeScreenComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

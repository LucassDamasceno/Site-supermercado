
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginGuard } from './guards/login.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpGuard } from './guards/sign-up.guard';

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:'sign-up', component: SignUpComponent, canActivate:[SignUpGuard]},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"home", component:HomeComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

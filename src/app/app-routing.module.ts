import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
// import { HomeComponent } from './user/home/home.component';
import { alreadyLoginGuard } from './auth/guards/already-login.guard';
import { loginprotectedGuard } from './guards/loginprotected.guard';
import { LandingComponent } from './public/landing/landing.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  { path: "auth", canActivate: [alreadyLoginGuard], loadChildren: () => import("../app/auth/auth-routing.module").then(m => m.AuthRoutingModule) },
  { path: "user", canActivate: [loginprotectedGuard], loadChildren: () => import("../app/user/user-routing.module").then(u => u.UserRoutingModule) },
  { path: "", canActivate: [alreadyLoginGuard], component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };

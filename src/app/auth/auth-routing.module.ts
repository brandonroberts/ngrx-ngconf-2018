import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page.component';
import { UserHomeComponent } from './components/user-home.component';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'home', component: UserHomeComponent, canActivate: [AuthGuardService] }
    ])
  ],
  providers: [AuthGuardService]
})
export class AuthRoutingModule {}

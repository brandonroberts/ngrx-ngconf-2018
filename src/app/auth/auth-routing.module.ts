import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page.component';
import { UserHomeComponent } from './components/user-home.component';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'home', component: UserHomeComponent, canActivate: [AuthService] }
    ]),
  ],
  providers: [AuthService]
})
export class AuthRoutingModule {}

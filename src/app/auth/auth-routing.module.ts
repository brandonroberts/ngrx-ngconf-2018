import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
  ],
})
export class AuthRoutingModule {}

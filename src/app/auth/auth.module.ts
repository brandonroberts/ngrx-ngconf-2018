import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPageComponent],
  providers: [AuthService]
})
export class AuthModule { }

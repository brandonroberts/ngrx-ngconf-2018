import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { LoginPageComponent } from './components/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
  providers: [AuthService]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { LoginPageComponent } from './components/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form.component';
import { LogoutPromptComponent } from './components/logout-prompt.component';
import { UserHomeComponent } from '@app/auth/components/user-home.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LogoutPromptComponent,
    UserHomeComponent,
  ],
  entryComponents: [LogoutPromptComponent],
})
export class AuthModule {}

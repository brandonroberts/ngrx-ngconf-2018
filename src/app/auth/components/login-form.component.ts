import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authenticate } from '../models/authentication.model';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card>
      <mat-card-title>
        Login
      </mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="submit()">
          <mat-form-field>
            <input matInput type="text" formControlName="username" placeholder="Email Address">
            <mat-error *ngIf="loginForm.hasError('required', ['username'])">Email Address is required</mat-error>
          </mat-form-field>

          <mat-form-field>
            <input matInput type="password" formControlName="password" placeholder="Password">
            <mat-error *ngIf="loginForm.hasError('required', ['password'])">Password is required</mat-error>
          </mat-form-field>
          
          <div *ngIf="error" class="loginError">
            {{ error }}
          </div>

          <div class="loginButtons">
            <button type="submit" mat-button>Login</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      width: 100%;
    }
    
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    mat-card-title,
    mat-card-content {
      display: flex;
      justify-content: center;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 8px;
    }

    .loginError {
      padding: 16px;
      width: 300px;
      color: white;
      background-color: red;
    }

    .loginButtons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }    

  `]
})
export class LoginFormComponent implements OnInit {
  @Input() error: string | null;

  @Input() set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  };

  @Output() submitted = new EventEmitter<Authenticate>();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {}

  submit() {
    const value: Authenticate = this.loginForm.value;

    if (this.loginForm.valid) {
      this.submitted.emit(value);
    }
  }
}

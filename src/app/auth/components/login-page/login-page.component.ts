import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/shared/state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '@app/auth/actions/auth.actions';
import { Authenticate } from '@app/auth/models/authentication.model';

@Component({
  selector: 'app-login-page',
  template: `
    <form [formGroup]="loginForm">
      <mat-form-field>
        <input matInput type="text" formControlName="username" placeholder="Email Address">
      </mat-form-field>

      <mat-form-field>
        <input matInput type="password" formControlName="password" placeholder="Password">
      </mat-form-field>
      
      <button mat-raised-button (click)="login()">Login</button>
    </form>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 128px 12px 12px 12px;
    }

    form {
      width: 250px;
      max-width: 450px;
      display: flex;
      flex-direction: column;
    }

    mat-form-field {
      margin-bottom: 8px;
    }
  `]
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
  }

  login() {
    const credentials: Authenticate = this.loginForm.value;

    this.store.dispatch(new Login(credentials));
  }
}

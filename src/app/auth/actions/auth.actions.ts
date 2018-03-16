import { Action } from '@ngrx/store';
import { Authenticate } from '../models/authentication.model';
import { UserModel } from '../models/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  LogoutComplete = '[Auth] Logout Complete',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutComplete;

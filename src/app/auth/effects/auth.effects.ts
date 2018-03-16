import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {
  AuthActions,
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  LogoutComplete,
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType<Login>(AuthActionTypes.Login)
    .pipe(
      map(action => action.payload),
      exhaustMap(auth =>
        this.authService
          .login(auth)
          .pipe(
            map(user => new LoginSuccess({ user })),
            catchError(error => of(new LoginFailure(error)))
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(auth =>
        this.authService
          .logout()
          .pipe(
            map(() => new LogoutComplete()),
            finalize(() => new LogoutComplete())
          ),
      ),
    );    

  constructor(private actions$: Actions, private authService: AuthService) {}
}

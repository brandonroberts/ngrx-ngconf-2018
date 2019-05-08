import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of, empty } from 'rxjs';
import {
  AuthActions,
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  LogoutConfirmed,
  LogoutComplete,
  LogoutCancelled,
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
      map(action => action.payload),
      exhaustMap(auth =>
        this.authService
          .login(auth)
          .pipe(
            map(user => new LoginSuccess({ user })),
            catchError(error => of(new LoginFailure(error))),
          ),
      ),
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/books'])));

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map(confirmed => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            })
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed),
    exhaustMap(auth =>
        this.authService
          .logout()
          .pipe(
            tap(() => this.router.navigate(['/login'])),
            map(() => new LogoutComplete()),
            catchError(() => of(new LogoutComplete())),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}
}

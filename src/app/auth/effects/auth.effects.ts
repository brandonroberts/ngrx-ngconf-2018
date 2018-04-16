import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {
  AuthActions,
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  LogoutConfirmed,
  LogoutComplete,
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { empty } from 'rxjs/observable/empty';

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
            catchError(error => of(new LoginFailure(error))),
          ),
      ),
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType<LoginSuccess>(AuthActionTypes.LoginSuccess)
    .pipe(tap(() => this.router.navigate(['/books'])));

  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            mergeMap(confirmed => {
              if (confirmed) {
                return of(new LogoutConfirmed());
              } else {
                return empty();
              }
            }),
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed)
    .pipe(
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

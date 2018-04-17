import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { AuthEffects } from './auth.effects';
import { provideMagicalMock, Mock } from 'angular-testing-library';
import { AuthService } from '@app/auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { Login, LoginSuccess, LoginFailure } from '@app/auth/actions/auth.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

describe('Auth Effects', () => {
  let effects: AuthEffects;
  let authService: Mock<AuthService>;
  let actions$: Observable<any>;
  let router: Mock<Router>;
  let dialogService: Mock<MatDialog>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMagicalMock(AuthService),
        provideMagicalMock(Router),
        provideMagicalMock(MatDialog),
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    dialogService = TestBed.get(MatDialog);
    router = TestBed.get(Router);
  });

  it('should redirect the user after successful login', () => {
    const user: any = { name: 'Auth User' };
    const action = new LoginSuccess({ user });

    actions$ = of(action);
    effects.loginRedirect$.subscribe();

    expect(router.navigate).toHaveBeenCalledWith(['/books']);
  });
});

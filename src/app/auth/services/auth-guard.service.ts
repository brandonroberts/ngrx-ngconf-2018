import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, take, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromStore from '@app/state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.State>,
  ) {}

  canActivate() {
    return this.checkStoreAuth().pipe(
      mergeMap(authenticated => {
        if (authenticated) {
          return of(true);
        }

        return this.checkApiAuthentication();
      }),
    );
  }

  checkStoreAuth() {
    return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  }

  checkApiAuthentication() {
    return this.authService.check().pipe(map(user => !!user));
  }
}

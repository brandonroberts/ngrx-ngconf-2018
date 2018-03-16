import { Injectable } from '@angular/core';
import { UserModel } from '@app/auth/models/user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Authenticate } from '../models/authentication.model';

@Injectable()
export class AuthService {
  login(auth: Authenticate): Observable<UserModel> {
    return of({ name: 'Brandon', email: 'brandon@ngrx.io' });
  }

  logout() {
    return of(true);
  }
}

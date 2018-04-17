import { Injectable } from '@angular/core';
import { UserModel } from '@app/auth/models/user.model';
import { Observable, of, throwError } from 'rxjs';
import { Authenticate } from '../models/authentication.model';

const mockUser = { name: 'Brandon', email: 'brandon@ngrx.io' }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(auth: Authenticate): Observable<UserModel> {
    if (auth.username !== 'ngconf') {
      return throwError('Invalid username or password');
    }

    this.loggedIn = true;
    return of(mockUser);
  }

  logout() {
    this.loggedIn = false;
    return of(true);
  }

  check() {
    return of(this.loggedIn ? mockUser : null);
  }
}

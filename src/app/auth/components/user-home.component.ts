import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/state';
import { Logout } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'app-user-home',
  template: `
    <div>
      <h3>Welcome Home!</h3>

      <button mat-button raised color="accent" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 128px 0 0 0;
    }

    div {
      width: 100%;
      min-width: 250px;
      max-width: 300px;
    }
  `,
  ],
})
export class UserHomeComponent {
  constructor(private store: Store<fromStore.State>) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}

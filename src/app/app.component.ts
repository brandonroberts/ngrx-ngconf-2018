import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/state';
import { Logout } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav></mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>NgRx 2018</span>
          <span class="spacer"></span>
          <span *ngIf="loggedIn$ | async" (click)="onLogout()">Logout</span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    .spacer {
      flex: 1 1 auto;
    }    
    `]
})
export class AppComponent {
  loggedIn$ = this.store.select(fromStore.selectIsLoggedIn);

  constructor(private store: Store<fromStore.State>) {}

  onLogout() {
    this.store.dispatch(new Logout());
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav></mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>NgRx 2018</span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AppComponent {}

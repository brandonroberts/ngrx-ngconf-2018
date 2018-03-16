import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav mode="side" opened>Sidenav content</mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>NgRx Authentication</span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AppComponent {}

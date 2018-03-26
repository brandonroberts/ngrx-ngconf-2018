import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home',
  template: `
    <h3>Welcome Home!</h3>
  `,
  styles: [
    `
    :host {
      display: block;
      width: 100%;
      max-width: 450px;
    }

    [mat-button] {
      padding: 0;
    }
  `,
  ],
})
export class UserHomeComponent {
}

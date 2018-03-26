import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/home' }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

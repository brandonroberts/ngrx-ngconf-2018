import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BooksPageActions from '../actions/books-page.actions';
import { Book } from '../models/book';
import * as fromBooks from '../reducers';

@Component({
  selector: 'bc-books-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>

    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) {
    this.books$ = store.pipe(select(fromBooks.getAllBooks));
  }

  ngOnInit() {
    this.store.dispatch(new BooksPageActions.Load());
  }
}

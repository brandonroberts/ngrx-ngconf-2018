import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import {
  BooksPageActionTypes,
} from './../actions/books-page';
import {
  BooksApiActionTypes,
  LoadSuccess,
  LoadFail
} from './../actions/books-api';
import { GoogleBooksService } from '@app/services/google-books';

@Injectable()
export class BooksPageEffects {
  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(BooksPageActionTypes.Load),
    exhaustMap(() =>
      this.googleBooksService.searchBooks('NgRx')
        .pipe(
          map(books => new LoadSuccess(books),
          catchError(error => of(new LoadFail(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private googleBooksService: GoogleBooksService
  ) {}
}

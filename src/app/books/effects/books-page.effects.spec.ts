import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { BooksPageEffects } from './books-page.effects';
import { provideMagicalMock, Mock } from 'angular-testing-library';
import { GoogleBooksService } from '@app/services/google-books';
import { Observable, of } from 'rxjs';
import { Load } from '@app/books/actions/books-page.actions';
import { LoadSuccess, LoadFail } from '@app/books/actions/books-api.actions';
import { Book } from '@app/books/models/book';

describe('Books Page Effects', () => {
  let effects: BooksPageEffects;
  let googleBooksService: Mock<GoogleBooksService>;
  let actions$: Observable<any>;

  const data = {
    title: 'Book Title',
    author: 'John Smith',
    volumeId: '12345',
  };

  const books = {
    items: [
      { id: '12345', volumeInfo: { title: 'Title' } },
      { id: '67890', volumeInfo: { title: 'Another Title' } },
    ],
  };  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksPageEffects,
        provideMagicalMock(GoogleBooksService),
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.get(BooksPageEffects);
    googleBooksService = TestBed.get(GoogleBooksService);
  });

  it('should call the search api and return the search results', () => {
    const action = new Load();
    const result = new LoadSuccess(books.items as Book[]);

    actions$ = of(action);
    const response = cold('-a|', { a: books.items });
    const expected = cold('-b|', { b: result });

    googleBooksService.searchBooks.and.returnValue(response);

    expect(effects.loadCollection$).toBeObservable(expected);
  });
});

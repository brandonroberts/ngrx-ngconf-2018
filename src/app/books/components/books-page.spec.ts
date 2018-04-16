import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { MatCardModule, MatInputModule } from '@angular/material';

import { BooksPageComponent } from './books-page';
import { BookPreviewListComponent } from '../components/book-preview-list';
import { BookPreviewComponent } from '../components/book-preview';
import { BookAuthorsComponent } from '../components/book-authors';

import { EllipsisPipe } from '../../shared/pipes/ellipsis';
import { AddCommasPipe } from '../../shared/pipes/add-commas';

import * as BooksPageActions from '../actions/books-page';
import * as fromBooks from '../reducers';

describe('Collection Page', () => {
  let fixture: ComponentFixture<BooksPageComponent>;
  let store: Store<fromBooks.State>;
  let instance: BooksPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          books: combineReducers(fromBooks.reducers),
        }),
        MatCardModule,
        MatInputModule,
      ],
      declarations: [
        BooksPageComponent,
        BookPreviewListComponent,
        BookPreviewComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(BooksPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {

  });

  it('should dispatch a collection.Load on init', () => {

  });
});

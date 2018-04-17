import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models/book';
import { BooksApiActionTypes, BooksApiActionsUnion } from '../actions/books-api.actions';

export interface State extends EntityState<Book> {}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: BooksApiActionsUnion
): State {
  switch (action.type) {
    case BooksApiActionTypes.LoadSuccess: {
      return adapter.addAll(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getBookIds,
  selectEntities: getBookEntities,
  selectAll: getAllBooks,
  selectTotal: getTotalBooks,
} = adapter.getSelectors();

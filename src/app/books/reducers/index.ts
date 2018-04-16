import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromBooks from './books';
import * as fromRoot from '../../reducers';

export interface BooksState {
  books: fromBooks.State;
}

export interface State extends fromRoot.State {
  books: BooksState;
}

export const reducers: ActionReducerMap<BooksState> = {
  books: fromBooks.reducer,
};

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getBookEntitiesState = createSelector(
  getBooksState,
  state => state.books
);

export const getBookEntities = createSelector(getBookEntitiesState, fromBooks.getBookEntities)
export const getBookIds = createSelector(getBookEntitiesState, fromBooks.getBookIds);

export const getAllBooks = createSelector(
  getBookEntities,
  getBookIds,
  (entities, ids: string[]) => {
    return ids.map(id => entities[id]);
  }
);
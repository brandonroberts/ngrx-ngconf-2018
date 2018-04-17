import * as fromBooks from './books';
import { Load } from '../actions/books-page.actions';
import { Book, generateMockBook } from '../models/book';
import { LoadSuccess } from '../actions/books-api.actions';

describe('Books Reducer', () => {
  const book1 = generateMockBook();
  const book2 = { ...book1, id: '222' };
  const initialState: fromBooks.State = {
    ids: [book1.id, book2.id],
    entities: {
      [book1.id]: book1,
      [book2.id]: book2,
    }
  };

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = fromBooks.reducer(initialState, { type: '@@init' } as any);

      expect(state).toBe(initialState);
    });

    it('should load books on success', () => {
      const init = { type: '@@init' } as any;
      const load = new LoadSuccess([ book1, book2 ]);

      const state = [init, load].reduce(fromBooks.reducer, initialState);

      expect(state).toMatchSnapshot();
    });    
  });

  describe('Selectors', () => {
    describe('getAllBooks', () => {
      it('should return all the books', () => {
        const result = fromBooks.getAllBooks(initialState);

        expect(result.length).toBe(2);
      });
    });
  });
});

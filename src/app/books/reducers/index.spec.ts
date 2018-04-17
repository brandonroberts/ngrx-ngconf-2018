import * as fromBooks from './books';
import { generateMockBook } from '@app/books/models/book';
import * as fromBooksState from './';

describe('Books Feature Selectors', () => {
  const book1 = generateMockBook();
  const book2 = { ...book1, id: '222' };
  const state: fromBooks.State = {
    ids: [book1.id, book2.id],
    entities: {
      [book1.id]: book1,
      [book2.id]: book2,
    },
  };

  describe('getAllBooks', () => {
    it('should return all the books', () => {
      const result = fromBooksState.getAllBooks.projector(
        state.entities,
        state.ids,
      );

      expect(result.length).toBe(2);
    });
  });
});

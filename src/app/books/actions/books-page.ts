import { Action } from '@ngrx/store';
import { Book } from '../models/book';

export enum BooksPageActionTypes {
  Load = '[Books Page] Load Books'
}

export class Load implements Action {
  readonly type = BooksPageActionTypes.Load;
}

export type BooksPageActionsUnion =
  | Load;

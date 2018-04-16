import { Action } from '@ngrx/store';
import { Book } from '../models/book';

export enum BooksApiActionTypes {
  LoadSuccess = '[Books API] Load Success',
  LoadFail = '[Books API] Load Fail',
}

export class LoadSuccess implements Action {
  readonly type = BooksApiActionTypes.LoadSuccess;

  constructor(public payload: Book[]) {}
}

export class LoadFail implements Action {
  readonly type = BooksApiActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type BooksApiActionsUnion =
  | LoadSuccess
  | LoadFail;

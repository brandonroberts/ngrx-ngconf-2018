import { Action } from '@ngrx/store';
import { AuthActionTypes } from '@app/auth/actions/auth.actions';

export interface State {
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  pending: false,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true
      };
    }

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        pending: false
      };
    }    

    default: {
      return state;
    }
  }
}

export const selectPending = (state: State) => state.pending;
export const selectError = (state: State) => state.error;
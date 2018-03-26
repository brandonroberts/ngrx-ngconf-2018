import { Action } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '@app/auth/actions/auth.actions';

export interface State {
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  pending: false,
  error: null
};

export function update<T>(state: T, ...changes: Partial<T>[]): T {
  return changes.reduce((currentState: any, stateChange: any) => ({
    ...currentState, ...stateChange
  }), state);
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return update(state, { pending: true });
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return update(state, { error: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const selectPending = (state: State) => state.pending;
export const selectError = (state: State) => state.error;
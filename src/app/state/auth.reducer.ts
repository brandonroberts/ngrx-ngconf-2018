import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';
import { UserModel } from '@app/auth/models/user.model';

export interface State {
  user: UserModel | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return { ...state, user: action.payload.user };

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}

export const selectUser = (state: State) => state.user;

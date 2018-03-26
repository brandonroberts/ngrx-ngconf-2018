import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';

export interface State {
  auth: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser,
);
export const selectIsLoggedIn = createSelector(selectAuthUser, user => !!user);

export const selectLoginPageState = createFeatureSelector<fromLoginPage.State>(
  'loginPage',
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.selectPending,
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.selectError,
);

import * as fromUIReducer from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';

export interface AppState{
  ui: fromUIReducer.State;
  auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuth.authReducer
};

import * as fromUIReducer from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer'

export interface AppState{
  ui: fromUIReducer.State;
  auth: fromAuth.AuthState;
  // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuth.authReducer,
  // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer

};

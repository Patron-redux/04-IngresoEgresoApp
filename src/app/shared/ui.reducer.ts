
import * as fromUIActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export function uiReducer (state:State = initState,action: fromUIActions.acciones):State{
  switch(action.type){
    case fromUIActions.ACTIVAR_LOADING:
      return {
        isLoading: true
      };
    case fromUIActions.DESACTIVAR_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

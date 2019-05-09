
import * as fromAuth from './auth.action';
import { User } from './user.model';

export interface AuthState {
  user: User;
};

const iniAuthState: AuthState = {
  user: null
};

export function authReducer(state = iniAuthState,action:fromAuth.acciones  ):AuthState{
  switch(action.type){
    case fromAuth.SET_USER:
      return {
        user:{
          ...action.user
        }
      };
    default:
    return state;
  }

}

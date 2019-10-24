import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IUserState } from '../user/+store/reducers';

export interface IAppState {
  router: RouterReducerState; // 1.1
  user?: IUserState;
}

export const reducerMap: ActionReducerMap<IAppState> = {
  router: routerReducer // 1.2
};

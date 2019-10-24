import { IUser } from 'src/app/shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { loadUserEntitySuccess } from '../actions/entity';

export interface IEntityState { // 2.1
  entity: IUser;
}

const initialState: IEntityState = {
  entity: null
};

export const reducer = createReducer<IEntityState>(
  initialState,
  on(loadUserEntitySuccess, (state, { payload: { user } }) => ({ ...state, entity: user }))
);

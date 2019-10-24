import { loadUsers, loadUsersSuccess } from '../actions/list';
import { IUser } from 'src/app/shared/interfaces';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';


export interface IUserListState {
  isLoaded: boolean;
}

export interface IListState extends EntityState<IUser>, IUserListState { }

export const userListAdapter = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user._id
});

const initialState = userListAdapter.getInitialState<IUserListState>({
  isLoaded: false
});


export const reducer = createReducer<IListState>(
  initialState,
  on(loadUsers, state => ({ ...state, isLoaded: false })),
  on(loadUsersSuccess, (state, { payload: { users } }) => ({ ...userListAdapter.addAll(users, state), isLoaded: true }))
);

import { userListAdapter } from '../reducers/list';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { moduleReducerName, IUserState } from '../reducers';
import { getEntity } from './entity';
import { getIsLoaded } from './list';

const getUserModule = createFeatureSelector<IUserState>(moduleReducerName);
const getUserListState = createSelector(getUserModule, s => s.list);
const getUserEntityState = createSelector(getUserModule, s => s.entity);

/* List Selectors */
export const {
  selectAll: getUserListStateAllUsers,
  selectEntities: getUserListStateEntities,
  selectIds: getAllUserListStateUserIds,
  selectTotal: getUserListStateUserCount
} = userListAdapter.getSelectors(getUserListState);
export const getUserListStateIsLoaded = createSelector(getUserListState, getIsLoaded);

/* Entity Selectors */
export const getUserEntityStateEntity = createSelector(getUserEntityState, getEntity);

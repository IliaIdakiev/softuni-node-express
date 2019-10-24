import { createAction } from '@ngrx/store';
import { actionType } from 'src/app/shared/action-type';
import { IUser } from 'src/app/shared/interfaces/user';

export const loadUserEntity = createAction(
  actionType('[USER ENTITY] Load User'),
  (id: number) => ({ payload: { id } })
);

export const loadUserEntitySuccess = createAction(
  actionType('[USER ENTITY] Load User Success'),
  (user: IUser) => ({ payload: { user } })
);

export const loadUserEntityFailure = createAction(
  actionType('[USER ENTITY] Load User Failure'),
  (error: Error) => ({ payload: { error } })
);

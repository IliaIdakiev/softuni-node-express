import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userListAdapter } from '../reducers/list';
import { loadUsers } from '../actions/list';
import { IAppState } from 'src/app/+store';
import { getUserListStateAllUsers, getUserListStateIsLoaded } from '../selectors';

@Injectable({
  providedIn: 'root'
})
export class UserListModel {
  users$ = this.store.select(getUserListStateAllUsers);
  isLoaded$ = this.store.select(getUserListStateIsLoaded);

  constructor(private store: Store<IAppState>) { }

  loadUsers = () => {
    this.store.dispatch(loadUsers());
  }
}

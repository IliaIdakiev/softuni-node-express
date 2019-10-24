import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUserEntity } from '../actions/entity';
import { IUser } from 'src/app/shared/interfaces';
import { getUserEntityStateEntity } from '../selectors';
import { IAppState } from 'src/app/+store';

@Injectable({
  providedIn: 'root'
})
export class UserEntityModel {

  entity$ = this.store.select(getUserEntityStateEntity);

  constructor(private store: Store<IAppState>) { }

  loadUser = (id: number) => {
    this.store.dispatch(loadUserEntity(id));
  }

  saveUser = (user: IUser) => {
    // ...
  }
}

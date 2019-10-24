import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { loadUserEntitySuccess, loadUserEntityFailure, loadUserEntity } from '../actions/entity';
import { UserService } from '../../user.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserEntityEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserEntity),
    map(action => action.payload),
    switchMap(payload => this.userService.loadUser(payload.id)
      .pipe(
        map(user => loadUserEntitySuccess(user)),
        catchError(error => [loadUserEntityFailure(error)])
      ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}

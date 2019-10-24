import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { loadUsersSuccess, loadUsersFailure, loadUsers } from '../actions/list';
import { UserService } from '../../user.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserListEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => this.userService.loadUsers()
      .pipe(
        map(users => loadUsersSuccess(users)),
        catchError(error => [loadUsersFailure(error)])
      ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}

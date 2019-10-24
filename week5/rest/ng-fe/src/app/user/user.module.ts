import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EntityComponent } from './entity/entity.component';
import { UserRoutingModule } from './user-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from './+store/effects/list';
import { UserEntityEffects } from './+store/effects/entity';
import { StoreModule } from '@ngrx/store';
import { reducers, moduleReducerName } from './+store/reducers';


@NgModule({
  declarations: [ListComponent, EntityComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(moduleReducerName, reducers),
    EffectsModule.forFeature([
      UserListEffects,
      UserEntityEffects
    ])
  ]
})
export class UserModule { }

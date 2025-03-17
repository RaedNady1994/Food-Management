import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipeRoutingModule } from './user-recipe-routing.module';
import { UserRecipeComponent } from './user-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';


@NgModule({
  declarations: [
    UserRecipeComponent,
    ViewRecipeComponent
  ],
  imports: [
    CommonModule,
    UserRecipeRoutingModule,
    SharedModule
  ]
})
export class UserRecipeModule { }

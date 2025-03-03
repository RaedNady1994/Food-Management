import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    AddEditCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }

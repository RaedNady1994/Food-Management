import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }

import { Component } from '@angular/core';
import { ICategoriesResponse, IGetCategoriesRequest } from '../../interfaces/icategory';
import { CategoryService } from '../../services/category.service';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import {MatDialog} from '@angular/material/dialog'
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent {
  
  private gerCategoriesParams: IGetCategoriesRequest = {
    page: 1,
    size: 10,
  };

  getCategoriesResponse!: IPagedResponse<ICategoriesResponse>

  constructor(private service: CategoryService, public dialog: MatDialog) {
    this.initiateCategoryData();
  }

  initiateCategoryData() {
    this.service.getCategories(this.gerCategoriesParams).subscribe((res) => {
      this.getCategoriesResponse = res;
    });
  }

  openAddEditCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50%', 
      minWidth:'350px',
      data: {name:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        alert('rrr');
      }
    });
  }
}

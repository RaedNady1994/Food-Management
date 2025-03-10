import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import {
  ICategoriesResponse,
  IGetCategoriesRequest,
} from '../../interfaces/icategory';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { PageEvent } from '@angular/material/paginator';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  categoriesResponse!: IPagedResponse<ICategoriesResponse>;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    
    let paginationRequest: IGetCategoriesRequest = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.categoryService.get(paginationRequest).subscribe({
      next: (res) => {
        this.categoriesResponse = res;
        this.length = res.totalNumberOfRecords; 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Failed to load categories',
          'Error'
        );
      },
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories(); 
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50%',
      minWidth: '350px',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.name) {
        this.addCategory(result.name);
      }
    });
  }

  addCategory(name: string): void {
    this.categoryService.add({ name }).subscribe({
      next: () => {
        this.toastr.success('Category created successfully', 'Success');
        this.loadCategories(); 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Error adding category',
          'Error'
        );
      },
    });
  }

  openEditCategoryDialog(category: ICategoriesResponse): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50%',
      minWidth: '350px',
      data: { name: category.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.name) {
        this.updateCategory(category.id, { name: result.name });
      }
    });
  }

  updateCategory(id: number, data: { name: string }): void {
    this.categoryService.update(id, data).subscribe({
      next: () => {
        this.toastr.success('Category updated successfully', 'Success');
        this.loadCategories(); 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Error updating category',
          'Error'
        );
      },
    });
  }

  openDeleteCategoryDialog(category: ICategoriesResponse): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '50%',
      minWidth: '350px',
      data: { elementType: 'Category', elementName: category.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.elementName) {
        this.deleteCategory(category.id);
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Category deleted successfully', 'Success');
        this.loadCategories(); 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Error deleting category',
          'Error'
        );
      },
    });
  }

  openViewCategoryDialog(category: ICategoriesResponse): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50%',
      minWidth: '350px',
      data: { name: category.name, isReadOnly: true },
    });
  }
}

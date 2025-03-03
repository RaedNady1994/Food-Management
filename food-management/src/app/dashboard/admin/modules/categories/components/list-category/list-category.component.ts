import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ICategoriesResponse, IGetCategoriesRequest } from '../../interfaces/icategory';
import { CategoryService } from '../../services/category.service';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  categoriesParams: IGetCategoriesRequest = {
    page: 1,
    size: 10,
  };

  categoriesResponse!: IPagedResponse<ICategoriesResponse>;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories(this.categoriesParams).subscribe({
      next: (res) => {
        this.categoriesResponse = res;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to load categories', 'Error');
      },
    });
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
    this.categoryService.addCategory({ name }).subscribe({
      next: () => {
        this.toastr.success('Category created successfully', 'Success');
        this.loadCategories();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Error adding category', 'Error');
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
    this.categoryService.updateCategory(id, data).subscribe({
      next: () => {
        this.toastr.success('Category updated successfully', 'Success');
        this.loadCategories();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Error updating category', 'Error');
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

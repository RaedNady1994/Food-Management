import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { HelperService, ILookupResponse } from 'src/app/shared/helper.service';
import { ICategoriesResponse } from '../../../categories/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../categories/services/category.service';
import { RecipeService } from '../../service/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
})
export class AddEditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  tags$!: Observable<Array<ILookupResponse>>;
  categories$!: Observable<IPagedResponse<ICategoriesResponse>>;
  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTags();
    this.loadCategories();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      tagId: [null, Validators.required],
      categoriesIds: [[], Validators.required],
      recipeImage: [null], 
    });
  }

  loadTags(): void {
    this.tags$ = this.helperService.getTags();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.get({
      pageNumber: 0,
      pageSize: 1000,
    });
  }

   
  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    this.recipeForm.patchValue({ recipeImage: this.files[0] });

  }
  
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.recipeForm.patchValue({ recipeImage: null });
  }

  saveRecipe(): void {
    if (this.recipeForm.invalid) return;
    const formData = new FormData();

    Object.entries(this.recipeForm.value).forEach(([key, value]) => {
      if (value != null && !(value instanceof File)) {
        formData.append(key, String(value));
      }
    });

    if (this.files.length > 0) {
      formData.append('recipeImage', this.files[0]);
    }

    this.recipeService.add(formData).subscribe({
      next: () => {
        this.toastr.success('Recipe saved successfully');
        this.router.navigate(['/dashboard/admin/recipes']);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to save Recipe', 'Error');
      },
    });
  }
}

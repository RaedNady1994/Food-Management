import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { IGetRecipesRequest, IRecipesResponse } from '../../admin/modules/recipes/iRecipe';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ILookupResponse, HelperService } from 'src/app/shared/helper.service';
import { ICategoriesResponse, IGetCategoriesRequest } from '../../admin/modules/categories/interfaces/icategory';
import { CategoryService } from '../../admin/modules/categories/services/category.service';
import { RecipeService } from '../../admin/modules/recipes/service/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent implements OnInit, OnDestroy {


  recipesResponse!: IPagedResponse<IRecipesResponse>;
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  readonly pageSizeOptions = [10, 25, 50];
  searchBy = '';
  tagId? :number | null;
  categoryId? :number | null;

  tags$!: Observable<Array<ILookupResponse>>;
  categories$!: Observable<IPagedResponse<ICategoriesResponse>>;


  searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();
  private lastSearchBy: string = 'temp Value';

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private categoryService: CategoryService,
     private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadTags();
    this.loadCategories();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadRecipes();
      });
  }

  loadRecipes(): void {
    const request: IGetRecipesRequest = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
      name: this.searchBy,
      tagId: this.tagId,
      categoryId: this.categoryId
    };

    this.recipeService
      .get(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.recipesResponse = res;
          this.totalRecords = res.totalNumberOfRecords;
        },
        error: (err) => {
          this.toastr.error(
            err?.error?.message || 'Failed to load Recipes',
            'Error'
          );
        },
      });
  }

  loadTags(): void {
    this.tags$ = this.helperService.getTags();
  }
  loadCategories(): void {
    const params: IGetCategoriesRequest = {
      pageNumber : 0,
      pageSize : 1000
    }
    this.categories$ = this.categoryService.get(params);
  }

  onSearchInputChange(): void {
    
    if (this.searchBy === this.lastSearchBy) {
      return;
    }
    this.lastSearchBy = this.searchBy;
    this.searchSubject.next(this.searchBy);
  }

  getCategoryNames(recipe: IRecipesResponse): string {
    return recipe.category.map((cat) => cat.name).join(', ');
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRecipes();
  }

  clearFilter(){
     this.searchBy = '';
     this.tagId = null;
     this.categoryId = null;
     this.loadRecipes();
  }

  openViewRecipeDialog(recipe: IRecipesResponse) {
const dialogRef = this.dialog.open(ViewRecipeComponent, {
      width: '50%',
      minWidth: '350px',
      data: recipe,
    });
  }

  AddToFavorite(recipe: IRecipesResponse) {
  this.recipeService.addToFav({recipeId: recipe.id}).subscribe({
    next: () => {
      this.toastr.success('Recipe added to fav successfully', 'Success');
    },
    error: (err) => {
      this.toastr.error(
        err?.error?.message || 'Error adding recipe to favorite',
        'Error'
      );
    },
  });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { CategoryService } from './../../../categories/services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { IGetRecipesRequest, IRecipesResponse } from '../../iRecipe';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../service/recipe.service';
import { PageEvent } from '@angular/material/paginator';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { HelperService, ILookupResponse } from 'src/app/shared/helper.service';
import { ICategoriesResponse, IGetCategoriesRequest } from '../../../categories/interfaces/icategory';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss'],
})
export class ListRecipesComponent implements OnInit, OnDestroy {
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
    private categoryService: CategoryService
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

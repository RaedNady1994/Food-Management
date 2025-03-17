import { Component } from '@angular/core';
import { FavoriteRecipe } from './favorite-recipe';
import { FavoriteRecipeService } from './favorite-recipe.service';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { IRecipesResponse } from '../../admin/modules/recipes/iRecipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  
  favoriteRecipes: FavoriteRecipe[] = [];
  viewMode: string = 'grid'; 

  constructor(private recipeService: FavoriteRecipeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.recipeService.getFavoriteRecipes().subscribe((response: IPagedResponse<FavoriteRecipe>) => {
      this.favoriteRecipes = response.data;
    });
  }

  removeRecipe(recipeId: number): void {
    this.recipeService.removeFromFavorites(recipeId).subscribe({
        next: () => {
          this.toastr.success('Favorite Recipe deleted successfully', 'Success');
          this.loadFavorites(); 
        },
        error: (err) => {
          this.toastr.error(
            err?.error?.message || 'Error on deleting favorite recipe',
            'Error'
          );
        },
    });
  }

  getCategoryNames(recipe: IRecipesResponse): string {
    return recipe.category.map((cat) => cat.name).join(', ');
  }
}
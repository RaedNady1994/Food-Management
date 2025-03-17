import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteRecipe } from './favorite-recipe';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteRecipeService {

  constructor(private http: HttpClient) {}

  getFavoriteRecipes(): Observable<IPagedResponse<FavoriteRecipe>> {
    return this.http.get<IPagedResponse<FavoriteRecipe>>(`userRecipe`);
  }

  removeFromFavorites(recipeId: number): Observable<void> {
    return this.http.delete<void>(`userRecipe/${recipeId}`);
  }
  
}

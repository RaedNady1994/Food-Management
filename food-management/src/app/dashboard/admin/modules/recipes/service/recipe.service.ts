import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetRecipesRequest, IRecipesResponse } from '../iRecipe';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
 
 
  constructor(private http: HttpClient) {}

  get(
    request: IGetRecipesRequest
  ): Observable<IPagedResponse<IRecipesResponse>> {

    let _params = new HttpParams();

    Object.entries(request).forEach(([key, value]) => {
      if (value) {
        _params = _params.append(key, value);
      }
    });

    return this.http.get<IPagedResponse<IRecipesResponse>>('Recipe', {
      params: _params,
    });
  }

  getById(id: number | null  ): Observable<IRecipesResponse> {

    return this.http.get<IRecipesResponse>(`Recipe/${id}`);
  }

  add(data: any): Observable<IRecipesResponse> {
    return this.http.post<IRecipesResponse>(`Recipe/`, data);
  }

  addToFav(data: any) {
    return this.http.post<IRecipesResponse>(`userRecipe/`, data);
  }

  update(id: number, data: any): Observable<IRecipesResponse> {
    return this.http.put<IRecipesResponse>(`Category/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`Recipe/${id}`);
  }
}

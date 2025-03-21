import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriesResponse, IGetCategoriesRequest } from '../interfaces/icategory';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService { 

  constructor(private http: HttpClient) {}

  get(request: IGetCategoriesRequest): Observable<IPagedResponse<ICategoriesResponse>> {
    return this.http.get<IPagedResponse<ICategoriesResponse>>(
      `Category/?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`
    );
  }

  add(data: { name: string }): Observable<ICategoriesResponse> {
    return this.http.post<ICategoriesResponse>(`Category/`, data);
  }

  update(id: number, data: { name: string }): Observable<ICategoriesResponse> {
    return this.http.put<ICategoriesResponse>(`Category/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`Category/${id}`);
  }
}

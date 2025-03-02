import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriesResponse, IGetCategoriesRequest } from '../interfaces/icategory';
import { IPagedResponse } from '../../../../../core/interfaces/ipaged-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(request: IGetCategoriesRequest): Observable<IPagedResponse<ICategoriesResponse>> {

    return this.http.get<IPagedResponse<ICategoriesResponse>>( `Category/?page=${request.page}&size=${request.size}`);
  }
}

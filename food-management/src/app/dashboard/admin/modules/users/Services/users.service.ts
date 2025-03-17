import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { User } from '../interfaces/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
  
    get(_params: any): Observable<IPagedResponse<User>> {
      return this.http.get<IPagedResponse<User>>(
        `Users`, {params : _params}
      );
    }

     getById(id: number | null  ): Observable<User> {
        return this.http.get<User>(`Users/${id}`);
      }
  
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`Users/${id}`);
    }
  }
  
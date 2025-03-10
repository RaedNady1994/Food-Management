import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) {}
  
    getTags():Observable<Array<ILookupResponse>> {
      return this.http.get<Array<ILookupResponse>>('tag');
    }
}


export interface ILookupResponse {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
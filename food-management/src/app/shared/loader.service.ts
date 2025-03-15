import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }
}

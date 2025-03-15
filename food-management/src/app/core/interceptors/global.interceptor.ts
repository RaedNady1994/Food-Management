import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoaderService } from 'src/app/shared/loader.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private baseUrl = 'https://upskilling-egypt.com:3006/api/v1/';

  constructor(private auth: AuthService, private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    const clonedRequest = request.clone({
      url: request.url.indexOf('/files/') > -1 ? request.url : `${this.baseUrl}${request.url}`,
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    this.loaderService.show(); 
    return next.handle(clonedRequest).pipe(
      finalize(() => {
        this.loaderService.hide();
      }));
  }
}

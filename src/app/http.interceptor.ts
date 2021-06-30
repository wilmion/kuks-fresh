import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getItemLocalStorage } from './core/utils/generateLocal';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request);

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    const token = getItemLocalStorage('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + token.replace(/[ '"]+/g, ''),
        },
      });
    }
    return request;
  }
}

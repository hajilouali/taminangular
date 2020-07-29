import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req, next) {
    const token = localStorage.getItem('token');

    const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(authRequest);
  }
}

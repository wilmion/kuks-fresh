import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { IAPI, IProduct } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }

  getAll():Observable<IAPI> {
    return this.http.get<IAPI>('http://localhost:3000/products');
  }
  getProduct(id:number):Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/product/${id}`);
  }
}

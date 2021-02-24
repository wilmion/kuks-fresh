import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { IProduct ,IScheduleConfigDay,IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API:string = "http://localhost:3000";
  

  
  constructor(
    private http:HttpClient
  ) { }

  getAll():Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API}/products`);
  }
  getUser(password:number):Observable<IUser>{
    return this.http.get<IUser>(`${this.API}/users/${password}`);
  }
  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.API}/users`);
  }
  getSchedulesConfigDay():Observable<IScheduleConfigDay[]>{
    return this.http.get<IScheduleConfigDay[]>(`${this.API}/orderScheduleTime`);
  }

  //Put

  updateUser(user:IUser) {
    return this.http.put(`${this.API}/users/1`, user)
  }
  updateProduct(product:IProduct ):Observable<IProduct>{
    return this.http.put<IProduct>(`${this.API}/product/${product.id}` , product);
  }

  //Delete

  deleteProduct(productId:number){
    return this.http.delete(`${this.API}/product/${productId}`);
  }

  //Post

  postProduct(product:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(`${this.API}/products` , product);
  }
}

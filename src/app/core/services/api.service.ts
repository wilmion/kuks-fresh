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
  getUser(password:number | string):Observable<IUser>{
    return this.http.get<IUser>(`${this.API}/users/${password}`);
  }
  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.API}/users`);
  }
  getExistUser(email:string):Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.API}/user/${email}`);
  }
  getSchedulesConfigDay():Observable<IScheduleConfigDay[]>{
    return this.http.get<IScheduleConfigDay[]>(`${this.API}/orderScheduleTime`);
  }

  //Put

  updateUser(user:IUser, id:string) {
    return this.http.put<IUser>(`${this.API}/users/${id}`, user)
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
  postUser(user:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.API}/users` , user);
  }
}

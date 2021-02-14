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
  getProduct(id:number):Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/product/${id}`);
  }
  getUser(password:number):Observable<IUser>{
    return this.http.get<IUser>(`${this.API}/users/${password}`);
  }
  getSchedulesConfigDay():Observable<IScheduleConfigDay[]>{
    return this.http.get<IScheduleConfigDay[]>(`${this.API}/orderScheduleTime`);
  }
  updateUser(user:IUser) {
    return this.http.put(`${this.API}/users/1`, user)
  }
}

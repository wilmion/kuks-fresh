import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  IProduct,
  IResponse,
  IResponseLogin,
  IScheduleConfigDay,
  IUser,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API: string = 'https://kuks-fresh.herokuapp.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IResponse<IProduct[]>> {
    return this.http.get<IResponse<IProduct[]>>(`${this.API}/products`);
  }
  getUsers(): Observable<IResponse<IUser[]>> {
    //check me
    return this.http.get<IResponse<IUser[]>>(`${this.API}/users`);
  }
  login(data: { email: string; password: string }) {
    return this.http.post<IResponse<IResponseLogin>>(
      `${this.API}/auth/login`,
      data
    );
  }
  getSchedulesConfigDay(): Observable<IResponse<IScheduleConfigDay[]>> {
    return this.http.get<IResponse<IScheduleConfigDay[]>>(
      `${this.API}/schedules-times/`
    );
  }

  //Put

  updateUser(user: IUser, id: string) {
    return this.http.patch<IResponse<string>>(`${this.API}/users/${id}`, user);
  }
  updateProduct(product: IProduct) {
    return this.http.patch<IResponse<string>>(
      `${this.API}/products/${product._id}`,
      product
    );
  }

  //Delete

  deleteProduct(productId: number) {
    return this.http.delete(`${this.API}/products/${productId}`);
  }

  //Post

  postProduct(product: IProduct) {
    return this.http.post<IResponse<string>>(`${this.API}/products`, product);
  }
  register(user: any) {
    return this.http.post<IResponse<string>>(`${this.API}/auth/register`, user);
  }
}

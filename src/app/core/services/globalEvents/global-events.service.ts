import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {

  //footer-items-admin

  private changeOrderProducts = new BehaviorSubject<{count:number , page:number}>({count: 5 , page:1});
  public eventOrderProduct$ = this.changeOrderProducts.asObservable();

  constructor() { }

  emitOrderProduct(count:number , page:number):void {
    this.changeOrderProducts.next({count , page});
  }
}

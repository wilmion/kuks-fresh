import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateStoreService {
  private dataChange:number = 0;
  private change = new BehaviorSubject<number>(0);
  change$ = this.change.asObservable();

  constructor() { }

  updated():void{
    this.dataChange = this.dataChange + 1;
    this.change.next(this.dataChange);

  }
}

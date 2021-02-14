import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { increment } from '../store/store.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  count$: Observable<number> ;


  constructor(
    private store : Store<{count:number}>
  ) { 
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
  }
  increment():void{
    this.store.dispatch(increment())
  }
}

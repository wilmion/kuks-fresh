import { Component, OnInit } from '@angular/core';
import { Params , ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  product:IProduct | undefined;
  isLoading:boolean = true;

  constructor(
    private router: ActivatedRoute,
    private store:Store<{products:IProduct[]}>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.router.params
    .subscribe((param:Params) => {
      const id:string = param.id;
      this.getProduct(Number(id));
      
    });
  }
  getProduct(id:number):void{
    this.store.select('products')
    .subscribe(data => {
      this.product = data.find(p => p.id === id);
      this.isLoading = data.length === 0;
    });
  }

}

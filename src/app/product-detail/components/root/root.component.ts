import { Component, OnInit } from '@angular/core';
import { Params , ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  product:IProduct | undefined;
  isLoading:boolean = true;

  constructor(
    private apiService:ApiService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.router.params
    .subscribe((param:Params) => {
      const id:string = param.id;
      this.getProduct(Number(id));
    });
  }
  getProduct(id:number):void{
    this.apiService.getProduct(id)
    .subscribe(data => {
      this.product = data;
      this.isLoading = false;
    })
  }

}

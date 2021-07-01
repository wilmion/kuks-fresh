import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { IProduct } from '@core/models/interfaces';

import { actions } from '@core/models/tuplas';

import { GlobalEventsService } from '@core/services/globalEvents/global-events.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() data: IProduct[] = [];
  @Input() param: actions = 'items';
  dataShow: IProduct[] = [];

  constructor(private globalEvents: GlobalEventsService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.param === 'items') {
      this.changeOrderProducts();
    }
  }

  //Muestra los productos por página
  changeOrderProducts(): void {
    this.globalEvents.eventOrderProduct$.subscribe((event) => {
      let each: number = 0;
      const newProductList: IProduct[] = [];

      this.data.forEach((product) => {
        const index: number = this.data.indexOf(product);
        if (each < event.count && index >= (event.page - 1) * event.count) {
          each++;
          newProductList.push(product);
        }
      });

      this.dataShow = newProductList;
    });
  }
}

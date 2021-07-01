import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { mapNavigation } from '@core/mocks/mapNavigation.mock';

import { IProduct, IMapNavigation } from '@core/models/interfaces';

import { actions } from '@core/models/tuplas';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  //Map

  mapNavigation: IMapNavigation[] = [];

  //datas

  data: IProduct[] = [];
  action: actions = 'items';

  constructor(
    private productsState: Store<{ products: IProduct[] }>,
    private router: ActivatedRoute
  ) {
    this.mapNavigation = mapNavigation;
  }

  ngOnInit(): void {
    this.router.params.subscribe((d) => {
      this.action = d.action;
      this.setFuncionality(this.action);
    });
  }
  setFuncionality(action: actions): void {
    if (action === 'items') {
      this.productsState.select('products').subscribe((data) => {
        this.data = data;
      });
    }
  }
}

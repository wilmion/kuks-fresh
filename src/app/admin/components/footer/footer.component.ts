import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { IProduct } from '@core/models/interfaces';

import { actions } from '@core/models/tuplas';

import { GlobalEventsService } from '@core/services/globalEvents/global-events.service';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() param: actions = 'items';
  @Input() data: IProduct[] = [];

  //items

  count: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private globalEventsService: GlobalEventsService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.param === 'items') {
      setTimeout(() => {
        this.globalEventsService.emitOrderProduct(this.count, this.currentPage);
      }, 60);
    }
  }

  /*Items*/

  // Del UI
  ItemsperPage(event: any, count: number): void {
    const element: HTMLElement = event.target;
    const childs: HTMLElement[] = event.target.parentNode.children;

    if (
      element.className !==
      'admin-footer-first__option admin-footer-first__option--selected'
    ) {
      this.globalEventsService.emitOrderProduct(count, this.currentPage);
    }

    for (const e of childs) {
      if (element.innerText === e.innerText) {
        e.className =
          'admin-footer-first__option admin-footer-first__option--selected';
      } else if (
        e.className ===
        'admin-footer-first__option admin-footer-first__option--selected'
      ) {
        e.className =
          'admin-footer-first__option admin-footer-first__option--unselected';
      }
    }

    this.count = count;
  }

  // Cambiar de página
  togglePage(direction: 'left' | 'rigth' | 'none', event?: any): void {
    if (direction === 'left') {
      this.currentPage = this.currentPage - 1;
    } else if (direction === 'rigth') {
      this.currentPage = this.currentPage + 1;
    } else {
      const element: any = event.target;
      const childs: HTMLElement[] = element.parentNode.children;

      for (let a of childs) {
        if (a.innerText === element.innerText) {
          element.className =
            'admin-footer-second__nPage admin-footer-second__nPage--selected';
        } else {
          element.className =
            'admin-footer-second__nPage admin-footer-second__nPage--unselected';
        }
      }

      this.currentPage = Number(element.innerText);
    }
    this.globalEventsService.emitOrderProduct(this.count, this.currentPage);
  }

  // Obtener las páginas
  getPagesItems(): Array<number> {
    const pageCount: number = Math.trunc(this.data.length / this.count);

    this.totalPages = pageCount;

    const pageItems: Array<number> = new Array(pageCount + 1).fill(0);

    return pageItems;
  }
}

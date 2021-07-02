import { Component, OnInit } from '@angular/core';

import { setTitle } from '@core/utils/setTitle.util';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    setTitle('Contact Us');
  }
}

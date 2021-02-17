import { Component, OnInit , Input } from '@angular/core';

import { IProduct } from 'src/app/core/models/interfaces';
import { actions } from '../../../core/models/tuplas';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() data:IProduct[] = [];
  @Input() items:actions = 'items';

  constructor() { }

  ngOnInit(): void {
    
  }

}

import { Component, OnInit , Input } from '@angular/core';

import { actions } from '../../../core/models/tuplas';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() param:actions = "items";

  constructor() { }

  ngOnInit(): void {
  }

}

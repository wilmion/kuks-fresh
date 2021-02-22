import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

import { actions } from 'src/app/core/models/tuplas';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Input() content:string = 'My Profile';
  @Input() icon:string = 'far fa-user';
  @Input() paramElement:actions = "items";

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  navigateToUrl():void{
    const url:string = `/admin/${this.paramElement}`;

    this.router.navigate([url]);
  }

}

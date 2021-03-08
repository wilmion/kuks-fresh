import { Component, OnInit , Input } from '@angular/core';
import { IUser } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  @Input() user:IUser | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}

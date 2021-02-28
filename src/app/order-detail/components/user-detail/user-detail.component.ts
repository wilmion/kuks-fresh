import { Component, OnInit , Input } from '@angular/core';
import { IUser } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user:IUser | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}

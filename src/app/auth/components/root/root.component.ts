import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

import { writeLocalStorage } from '../../../core/utils/generateLocal'; 

import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/interfaces';
import { signUp } from '../../../store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  param:'login' | 'register' = "login";

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private StoreUser:Store<{user:IUser}>
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.param = params.mode;
    })
  }
  navigateToURl(url:string):void {
    this.router.navigate([url]);
  }
  logIn(user:IUser){
    this.StoreUser.dispatch(signUp({user}));
    writeLocalStorage('user' ,  user );
    this.router.navigate(['/']);
  }

}

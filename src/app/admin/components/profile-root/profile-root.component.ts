import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from'rxjs';

import { UpdateStoreService } from '../../../core/services/updateStore/update-store.service'
import { ApiService } from '../../../core/services/api.service'

import { IUser } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss']
})
export class ProfileRootComponent implements OnInit , OnDestroy {

  user:IUser | undefined;
  isLoading:boolean = true;

  form:FormGroup;

  //subcripcion

  userSubcription:Subscription;

  constructor(
    private userState:Store<{user:IUser}>,
    private formBuilder:FormBuilder,
    private updateStore:UpdateStoreService,
    private apiService:ApiService
  ) { 
    this.form = this.formBuilder.group({
      name: ['' , Validators.required ],
      image: ['' , Validators.required ],
      job: ['' , Validators.required ]
    })
    this.userSubcription = this.userState.select('user').subscribe(
      data => {
        this.isLoading = data.id === -1;
        this.user = data;
        this.setValuesInputs();
      }
    );
    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy():void {
    this.userSubcription.unsubscribe()
  }

  setValuesInputs():void{
    if( this.user && this.user.id !== -1){
      const user:IUser = this.user;
      this.form = this.formBuilder.group({
        name: [user.name , Validators.required ],
        image: [user.image , Validators.required ],
        job: [user.job , Validators.required]
      })
    }
    
  }

  updateUser():void{
    if(this.user){
      this.isLoading = true;

      const value = this.form.value;

      const newDatesOfUser:IUser = {
        ...this.user,
        name: value.name,
        image: value.image,
        job: value.job
      }

      this.apiService.updateUser(newDatesOfUser).subscribe(
        () => {
          this.updateStore.updated();
        },
        err => console.log(err),
        () => {
          this.isLoading = false;
        }
      )
    }
  }

}

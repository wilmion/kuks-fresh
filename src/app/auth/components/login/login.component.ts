import { Component, OnInit , EventEmitter , Output} from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { IUser } from 'src/app/core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup
  registerStatus :{error: null | string,loading: boolean,} = {
    error: null,
    loading: false,
  }

  @Output() eventLogin = new EventEmitter<IUser>();

  constructor(
    private formBuilder:FormBuilder,
    private apiService:ApiService
  ) {
    this.form = this.formBuilder.group({
      email: ['' , [Validators.required , Validators.email]],
      password: ['' , [Validators.required , Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.registerStatus.loading = true;

    const values = this.form.value;
    const email:string = values.email;
    const password:string = values.password;

    this.apiService.getUser(`${password}&${email}`).subscribe(user => {
      this.registerStatus.loading = false;
      this.eventLogin.emit(user);
    }, err => {
      this.registerStatus.loading = false;
      this.registerStatus.error = 'The user is not exist or password or email is incorrect!';
    })
  }

}

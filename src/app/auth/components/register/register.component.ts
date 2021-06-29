import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IUser } from 'src/app/core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  registerStatus: { error: null | string; loading: boolean } = {
    error: null,
    loading: false,
  };

  @Output() eventLogin = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    this.isValidCreated();
  }
  isValidCreated(): void {
    this.registerStatus.loading = true;

    const values = this.form.value;
    const name: string = values.name;
    const email: string = values.email;
    const password: string = values.password;

    this.createUser(name, email, password);
  }
  createUser(name: string, email: string, password: string): void {
    const newUser: any = {
      name,
      email,
      password,
      job: 'Not Defined',
      admin: false,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
      city: 'Not Defined',
      country: 'Not Defined',
      direction: 'Not Defined',
      dni: 'Not Defined',
      phoneNumber: 'Not Defined',
      houseNumber: 'Not Defined',
      shedules: [],
    };

    this.apiService.register(newUser).subscribe(
      (user) => {
        this.registerStatus.loading = false;
        this.eventLogin.emit(true);
      },
      (error) => {
        this.registerStatus.loading = false;
        this.registerStatus.error = error;
      }
    );
  }
}

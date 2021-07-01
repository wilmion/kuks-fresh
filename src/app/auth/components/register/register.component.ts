import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUser } from '@core/utils/auth.util';

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

    const newUser: IUser = createUser(name, email, password);
    this.register(newUser);
  }
  register(user: IUser): void {
    this.apiService.register(user).subscribe(
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

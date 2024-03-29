import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IUser } from '@core/models/interfaces';

import { UpdateStoreService } from '@core/services/updateStore/update-store.service';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss'],
})
export class ProfileRootComponent implements OnInit, OnDestroy {
  user: IUser | undefined;
  isLoading: boolean = true;

  form: FormGroup;

  //subcripcion

  userSubcription: Subscription;

  constructor(
    private userState: Store<{ user: IUser }>,
    private formBuilder: FormBuilder,
    private updateStore: UpdateStoreService,
    private apiService: ApiService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      job: ['', Validators.required],
    });
    this.userSubcription = this.userState.select('user').subscribe((data) => {
      this.isLoading = data._id === '-1';
      this.user = data;
      this.setValuesInputs();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }

  //Actualiza los valores en tiempo real
  setValuesInputs(): void {
    if (this.user && this.user._id !== '-1') {
      const user: IUser = this.user;

      this.form = this.formBuilder.group({
        name: [user.name, Validators.required],
        image: [user.image, Validators.required],
        job: [user.job, Validators.required],
      });
    }
  }

  // Actualiza el usuario
  updateUser(): void {
    if (this.user) {
      this.isLoading = true;

      const value = this.form.value;

      const newDatesOfUser: Partial<IUser> = {
        name: value.name,
        image: value.image,
        job: value.job,
      };

      this.apiService
        .updateUser(newDatesOfUser, this.user._id as string)
        .subscribe(
          () => {
            this.updateStore.updated();
          },
          (err) => console.log(err),
          () => {
            this.isLoading = false;
          }
        );
    }
  }
}

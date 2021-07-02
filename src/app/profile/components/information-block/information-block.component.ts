import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { signUp } from '@root/store/user/user.actions';

import {
  IProfileFrame,
  IProfileFrameValues,
  IUser,
} from '@core/models/interfaces';

import { ApiService } from '@core/services/api.service';

import { writeLocalStorage } from '@core/utils/generateLocal';

@Component({
  selector: 'app-information-block',
  templateUrl: './information-block.component.html',
  styleUrls: ['./information-block.component.scss'],
})
export class InformationBlockComponent implements OnInit {
  @Input() dataFrame: IProfileFrame | undefined;
  user: IUser | undefined;
  isLoading: boolean = false;

  constructor(
    private store: Store<{ user: IUser }>,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });
  }

  // Muestra / Oculta el icono de editamiendo de usuario
  showEditIcon(i: number, show: boolean): void {
    if (this.dataFrame) {
      this.dataFrame.configs[i].edit = show;
    }
  }

  // Prepara el cambio
  toggleEdit(i: number): void {
    if (this.dataFrame) {
      if (this.dataFrame.configs[i].edit) {
        this.updatedValue(i);
      }
      this.dataFrame.configs[i].edit = !this.dataFrame.configs[i].edit;
    }
  }

  // Edita el valor que cambiastes
  updatedValue(i: number): void {
    this.isLoading = true;

    const user = <IUser>this.user;
    const dF = <IProfileFrame>this.dataFrame;
    const config: IProfileFrameValues = dF.configs[i];

    let value: string = config.value;

    const putUser: Partial<IUser> = {
      shedules: [],
      [config.keyObject]: value,
    };

    this.apiService.updateUser(putUser, user._id as string).subscribe(
      () => {
        const newUser: IUser = { ...user, ...putUser };
        writeLocalStorage('user', newUser);
        this.store.dispatch(signUp({ user: newUser }));
      },
      (err) => {
        alert('hubo un error');
      },
      () => (this.isLoading = false)
    );
  }
}

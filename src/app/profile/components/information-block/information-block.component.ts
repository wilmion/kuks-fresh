import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { signUp } from '../../../store/user/user.actions';

import { ApiService } from '../../../core/services/api.service';
import { writeLocalStorage } from '../../../core/utils/generateLocal';
import {
  IProfileFrame,
  IProfileFrameValues,
  IUser,
} from 'src/app/core/models/interfaces';

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

  showEditIcon(i: number, show: boolean): void {
    if (this.dataFrame) {
      this.dataFrame.configs[i].edit = show;
    }
  }

  toggleEdit(i: number): void {
    if (this.dataFrame) {
      if (this.dataFrame.configs[i].edit) {
        this.updatedValue(i);
      }
      this.dataFrame.configs[i].edit = !this.dataFrame.configs[i].edit;
    }
  }

  updatedValue(i: number): void {
    this.isLoading = true;

    const user = <IUser>this.user;
    const dF = <IProfileFrame>this.dataFrame;
    const config: IProfileFrameValues = dF.configs[i];

    let value: string = config.value;

    if (config.keyObject === 'id') {
      const email: IProfileFrameValues = <IProfileFrameValues>(
        dF.configs.find((c) => c.keyObject === 'email')
      );

      value = `${value}&${email.value}`;
    }

    const putUser: IUser = {
      ...user,
      [config.keyObject]: value,
    };

    this.apiService.updateUser(putUser, user._id as string).subscribe(
      (data) => {
        writeLocalStorage('user', putUser);
        this.store.dispatch(signUp({ user: putUser }));
      },
      (err) => {
        alert('hubo un error');
      },
      () => (this.isLoading = false)
    );
  }
}

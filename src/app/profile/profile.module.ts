import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { RootComponent } from './components/root/root.component';
import { InformationBlockComponent } from './components/information-block/information-block.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';


@NgModule({
  declarations: [RootComponent, InformationBlockComponent, HeaderProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }

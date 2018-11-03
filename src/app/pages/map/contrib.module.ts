import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import { ContribPage } from './contrib-page.component';
import {CoreModule} from '../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ContribPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  CoreModule,
  ],
  declarations: [ContribPage]
})
export class MapPageModule {}

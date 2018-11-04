import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ChatsPage} from './chats.page';
import {CoreModule} from '../core/core.module';
import {EmojiPickerComponent} from "../../components/emoji-picker/emoji-picker.component";
import {RelativeTime} from "../../pipes/relative-time";

const routes: Routes = [
  {
    path: '',
    component: ChatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatsPage, EmojiPickerComponent, RelativeTime]
})
export class ChatsPageModule {}

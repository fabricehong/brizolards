import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {HomeRoutingModule} from './home-routing.module';
import {CoreModule} from '../core/core.module';
import {MapPageModule} from '../map/map.module';
import {EventsPageModule} from '../events/events.module';
import {ChatsPageModule} from '../chats/chats.module';
import {FeedPageModule} from '../feed/feed.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    CoreModule,
    MapPageModule,
      EventsPageModule,
      ChatsPageModule,
      FeedPageModule,
  ],
  declarations: [
      HomePage,
  ]
})
export class HomePageModule {}

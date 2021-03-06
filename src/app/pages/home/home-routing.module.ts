import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {EventsPage} from '../events/events.page';
import {ChatsPage} from '../chats/chats.page';
import {FeedPage} from '../feed/feed.page';
import {ContribPage} from '../contrib/contrib-page.component';

const routes: Routes = [
    {
      path: 'home',
      component: HomePage,
      children: [
          {
              path: '',
              redirectTo: '/home/(chats:chats)',
              pathMatch: 'full',
          },
          {
              path: 'chats',
              outlet: 'chats',
              component: ChatsPage,
          },
          {
              path: 'contrib',
              outlet: 'contrib',
              component: ContribPage,
          },
          {
              path: 'events',
              outlet: 'events',
              component: EventsPage,
          },
          {
              path: 'feed',
              outlet: 'feed',
              component: FeedPage,
          },
      ]
    },
    {
        path: '',
        redirectTo: '/home/(chats:chats)',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  declarations: []
})
export class HomeRoutingModule { }

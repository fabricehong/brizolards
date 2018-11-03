import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
    { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'add-chat', loadChildren: './add-chat/add-chat.module#AddChatPageModule' },
  { path: 'add-event', loadChildren: './add-event/add-event.module#AddEventPageModule' },
  { path: 'add-service', loadChildren: './add-service/add-service.module#AddServicePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

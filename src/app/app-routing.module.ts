import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'profil', loadChildren: './pages//profil/profil.module#ProfilPageModule' },
    { path: 'settings', loadChildren: './pages//settings/settings.module#SettingsPageModule' },
  { path: 'add-chat', loadChildren: './pages//add-chat/add-chat.module#AddChatPageModule' },
  { path: 'add-event', loadChildren: './pages//add-event/add-event.module#AddEventPageModule' },
  { path: 'add-service', loadChildren: './pages//add-service/add-service.module#AddServicePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

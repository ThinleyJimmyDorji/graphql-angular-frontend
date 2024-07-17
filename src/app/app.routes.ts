import { Routes } from '@angular/router';
import {MediaListComponent} from './components/posts/media-list.component';
import {MediaDetailComponent} from './components/media-detail/media-detail.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'anime', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'anime', component: MediaListComponent },
  { path: 'anime/:id', component: MediaDetailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '**', redirectTo: 'anime' },
];

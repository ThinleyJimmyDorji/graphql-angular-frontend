import { Routes } from '@angular/router';
import {PostsComponent} from './components/posts/posts.component';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

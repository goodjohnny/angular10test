import {NgModule} from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {PostFormComponent} from './post-form/post-form.component';


const routes: Routes = [
  { path: 'posts', component: PostsComponent},
  { path: 'postForm', component: PostFormComponent},
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


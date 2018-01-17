import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddCategoryComponent } from './add-category/add-category.component';

export const router: Routes = [
	{ path: 'posts', component: PostsComponent},
	{ path: 'posts/add', component: AddPostComponent},
	{ path: 'category/add', component: AddCategoryComponent},
	{ path: 'posts/:id', component: PostComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
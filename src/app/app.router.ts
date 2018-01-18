import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FilteredPostsComponent } from './filtered-posts/filtered-posts.component';
import { AccountComponent } from './account/account.component';

export const router: Routes = [
	{ path: 'posts/add', component: AddPostComponent},
	{ path: 'posts/filter/:filter_by/:filter', component: FilteredPostsComponent},
	{ path: 'posts/filter/:filter', component: FilteredPostsComponent},
	{ path: 'posts/:id', component: PostComponent },
	{ path: 'posts', component: PostsComponent},
	{ path: 'category/add', component: AddCategoryComponent},
	{ path: 'account', component: AccountComponent }
	
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
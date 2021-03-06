import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';

import { routes } from './app.router';

import { AppComponent } from './app.component';

import { SimpleService } from './services/simple.service';
import { NavComponent } from './nav/nav.component';
import { MembersComponent } from './members/members.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { PostComponent } from './post/post.component';
import { FilteredPostsComponent } from './filtered-posts/filtered-posts.component';
import { AccountComponent } from './account/account.component';
import { TruncatePipe } from './truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MembersComponent,
    RegisterComponent,
    LoginComponent,
    PostsComponent,
    AddPostComponent,
    AddCategoryComponent,
    PostComponent,
    FilteredPostsComponent,
    AccountComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    ReactiveFormsModule,
    routes,
    CKEditorModule
  ],
  providers: [SimpleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

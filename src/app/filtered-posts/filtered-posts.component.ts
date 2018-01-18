import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '../services/posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-filtered-posts',
  templateUrl: './filtered-posts.component.html',
  styleUrls: ['./filtered-posts.component.css'],
  providers: [ PostsService ]
})

export class FilteredPostsComponent implements OnInit {

	  filter_by: string;
    filter   : string
    posts    : Array<Post>;

  	constructor( private route: ActivatedRoute,
                 private postsService: PostsService ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
        this.filter    = params.filter;
        this.filter_by = params.filter_by;
        
        if (this.filter_by === 'author') {
          this.getPostsByAuthor(this.filter);
        }
        else {
          this.getPostsByCategory(this.filter);
        }

  		})

  	}

    getPostsByCategory( category: string ) {
      this.postsService.getPostsByCategory(category)
        .subscribe((res) => {
          if ( res.success === true ) {
            this.posts = res.posts;
          }
        })
    }

    getPostsByAuthor ( author: string ) {
      this.postsService.getPostsByAuthor(author)
        .subscribe( (res) => {
          if ( res.success === true ) {
            this.posts = res.posts;
          }
        })
    }

}

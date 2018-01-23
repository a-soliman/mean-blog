import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { PostsService } from '../services/posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [ PostsService ]
})

export class PostsComponent implements OnInit {
	posts: Array<Post>;
  name = 'Ahmed';
	now = moment();
  moment = moment
  	constructor( private postsService: PostsService ) {}

  	ngOnInit() {
  		this.getPosts();
  	}

  	getPosts() {
  		this.postsService.getPosts()
  			.subscribe((res) => {
  				if ( res.status === 'success') {
  					this.posts = res.posts;
            this.truncateBody(this.posts);
  				}
  			})
  	}

    truncateBody( list ) {
      if ( !list.length ) { return; }

      list.forEach((post) => {
        if ( post.body.length > 150 ) {
          post.body = post.body.substring(0, 150) + '...';
        }
      })
      return;
    }


}

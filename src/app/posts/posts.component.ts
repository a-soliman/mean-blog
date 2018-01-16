import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { PostsService } from '../services/posts.service';
import { Post } from '../post'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [ PostsService]
})

export class PostsComponent implements OnInit {
	posts: Array<Post>;
  name = 'Ahmed';
	now = moment();
  moment = moment
  	constructor( private postsService: PostsService ) {
      //let now = moment(); // add this 2 of 4
    console.log('hello world', this.now.format()); // add this 3 of 4
    console.log(this.now.add(7, 'days').format()); // add this 4of 4
    }

  	ngOnInit() {
  		this.getPosts();
  	}

  	getPosts() {
  		this.postsService.getPosts()
  			.subscribe((res) => {
  				if ( res.status === 'success') {
  					this.posts = res.posts
  					console.log(res);
  				}
  			})
  	}

}

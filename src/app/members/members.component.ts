import { Component, OnInit, Input } from '@angular/core';


import { PostsService } from '../services/posts.service';
import { Post } from '../post'


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [ PostsService]
})
export class MembersComponent implements OnInit {
	@Input() user;
	posts: Array<Post>;

  	constructor( private postsService: PostsService ) { }

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

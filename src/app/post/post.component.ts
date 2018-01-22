import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../services/post.service';
import { Post } from '../post';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ PostService ]
})

export class PostComponent implements OnInit {

	post: Post;

  	constructor( private route: ActivatedRoute, 
  				 private postService: PostService ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
  			console.log(params.id)
  			this.getPost(params.id);
  		})
  	}

  	getPost( id ) {
  		this.postService.getPost(id)
  			.subscribe((res) => {
  				this.post = res.post;
  			})
  	}



}

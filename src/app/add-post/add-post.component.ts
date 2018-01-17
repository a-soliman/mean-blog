import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddPostService } from '../services/add-post.service'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent implements OnInit {

	addPostForm: FormGroup;
	serverValidationErrors: Array<any> = [];
	successMessage: string;
	user = JSON.parse(localStorage.getItem('user')) || null;

  	constructor( private fb: FormBuilder, 
  				 private router:Router,
  				 private addPostService: AddPostService 
  				) { 
  		this.addPostForm = fb.group({
  			'title': [null, Validators.compose([ Validators.required, Validators.minLength(3) ])],
  			'category': [null],
  			'body': [ null, Validators.compose([ Validators.required, Validators.minLength(20) ])],
  			'mainImage': [ null],
  			'author': [ null ]
  		});
  	}

  	ngOnInit() {
  		console.log(this.user)
  		if( this.user === null ) {
  			console.log('user is null')
  			this.router.navigate([" "])
  		}
  	}

  	addPost( post ) {
  		post.author = this.user.username;
  		this.addPostService.addPost(post)
  			.subscribe((res) => {
  				console.log(res)
  				if ( res.success === true) {
					this.successMessage = res.message;
					this.serverValidationErrors = [];
					this.addPostForm.reset();
					this.router.navigate(["/posts"])
				}
				if ( res.errors) {
					return this.serverValidationErrors = res.errors;
				}
  			})
  	}

}

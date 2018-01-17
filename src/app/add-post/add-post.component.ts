import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddPostService } from '../services/add-post.service';
import { AddCategoryService } from '../services/add-category.service';
import { User } from '../user';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService, AddCategoryService ]
})
export class AddPostComponent implements OnInit {

	addPostForm              : FormGroup;
  categories               : Array<any> = [];
	serverValidationErrors   : Array<any> = [];
	successMessage           : string;
	user                     : User;

  	constructor( private fb: FormBuilder, 
  				 private router:Router,
  				 private addPostService: AddPostService,
           private addCategoryService: AddCategoryService 
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
      this.user = JSON.parse(localStorage.getItem('user')) || null;
  		
      if( this.user === null ) {
  			this.router.navigate([" "])
  		}

      this.getCategories();
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
				  
  			})
  	}

    getCategories() {
      this.addCategoryService.getCategories()
        .subscribe((res) => {

          if ( res.errors) {
            return this.serverValidationErrors = res.errors;
          }

          if ( res.success === true ) {
              res.categories.forEach((category) => {
              this.categories.push(category.name);
            })
          }
        })
    }

}

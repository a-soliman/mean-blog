import { Component, OnInit, ElementRef } from '@angular/core';
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
  public editorValue: string = '';

	addPostForm              : FormGroup;
  categories               : Array<any> = [];
	serverValidationErrors   : Array<any> = [];
	successMessage           : string;
	user                     : User;

  	constructor( private fb: FormBuilder, 
  				 private router:Router,
  				 private addPostService: AddPostService,
           private addCategoryService: AddCategoryService,
           private element: ElementRef
  				) { 
  		
      this.addPostForm = fb.group({
  			'title': [null, Validators.compose([ Validators.required, Validators.minLength(3) ])],
  			'category': [null],
  			'body': [ null, Validators.compose([ Validators.required, Validators.minLength(20) ])]
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
      //image handeling
      let files = this.element.nativeElement.querySelector('#mainImage').files;
      let file = files[0];
      
      let formData = new FormData();
      formData.append('mainImage', file, file.name);
      Object.keys(post).forEach((item) => {
        formData.append(item, post[item]);
      })
      //end imageHandeling
  		formData.append('author', this.user.username);
      //post.author = this.user.username;
  		this.addPostService.addPost(formData)
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

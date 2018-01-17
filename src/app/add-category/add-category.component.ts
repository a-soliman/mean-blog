import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddCategoryService } from '../services/add-category.service'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [ AddCategoryService ]
})
export class AddCategoryComponent implements OnInit {

	addCategoryForm: FormGroup;
	serverValidationErrors: Array<any> = [];
	successMessage: string;

  	constructor( private addCategoryService: AddCategoryService,
  				 private router: Router,
  				 private fb: FormBuilder ) { 

  		this.addCategoryForm = fb.group({
  			'name': [ null, Validators.compose([ Validators.required, Validators.minLength(3) ])]
  		});
  	}

  	ngOnInit() {
  	}

  	addCategory( category ) {
  		this.addCategoryService.addCategory(category)
  			.subscribe((res) => {
  				if ( res.success === true) {
					this.successMessage = res.message;
					this.serverValidationErrors = [];
					this.addCategoryForm.reset();
					this.router.navigate(["/posts"])
				}
				if ( res.errors) {
					return this.serverValidationErrors = res.errors;
				}
  			})
  	}

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	user: User;
	updateUserForm: FormGroup;
	serverValidationErrors: Array<any>;
	successMessage: string;


  	constructor( private fb: FormBuilder ) { 
		this.updateUserForm = fb.group({
			'name': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
			'email': [ null, Validators.compose([ Validators.required, Validators.email])],
			'username': [ null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
			'password': [ null, Validators.compose([ Validators.required, Validators.minLength(6)])],
			'password2': [ null, Validators.compose([ Validators.required, Validators.minLength(6)])]
		});
	}

  	ngOnInit() {
  		this.user = JSON.parse(localStorage.getItem('user')) || null;
  		console.log(this.user)
  	}

}

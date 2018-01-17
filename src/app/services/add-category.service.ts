import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AddCategoryService {

  constructor( private http: Http ) { }

  	addCategory( category ) {
  		return this.http.post("/api/category/add", category)
  			.map( res => res.json() );
  	}

  	getCategories() {
  		return this.http.get("/api/category")
  			.map( res => res.json() )
  	}

}

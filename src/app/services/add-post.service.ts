import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AddPostService {

  	constructor( private http: Http ) { }

  	addPost( post ) {
  		return this.http.post("/api/posts/add", post)
  			.map(res => res.json())
  	}

}

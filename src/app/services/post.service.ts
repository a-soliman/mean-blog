import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  	constructor(private http: Http) { }

  	getPost( id ) {
  		return this.http.get(`/api/posts/${id}`)
  			.map(res => res.json());
  	}

}

import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

	constructor( private http: Http ) { }

	getPosts() {
		return this.http.get("/api/posts")
			.map( res => res.json());
	}

}

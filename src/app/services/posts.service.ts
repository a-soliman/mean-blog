import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

	constructor( private http: Http ) { }

	getPosts() {
		return this.http.get("/api/posts")
			.map( res => res.json() );
	}

	getPostsByCategory( category: string ) {

		return this.http.get(`/api/posts/filter_by_category/${category}`)
			.map( res => res.json() );
	}

	getPostsByAuthor( author: string ) {
		return this.http.get(`api/posts/filter_by_author/${author}`)
			.map( res => res.json() );
	}

}

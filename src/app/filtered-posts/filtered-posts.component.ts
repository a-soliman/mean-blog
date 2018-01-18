import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered-posts',
  templateUrl: './filtered-posts.component.html',
  styleUrls: ['./filtered-posts.component.css']
})
export class FilteredPostsComponent implements OnInit {

	filterBy: string;

  	constructor( private route: ActivatedRoute ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
  			console.log(params.filter);
  		})
  	}

}

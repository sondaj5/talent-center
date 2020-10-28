import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../navbar.service';
import { SearchResults, SearchService } from '../search.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-search-results',
	templateUrl: './searchResults.component.html',
	styleUrls: ['./searchResults.component.scss'],
})
export class SearchResultsComponent implements OnInit {
	searchQuery = '';

	searchResults: SearchResults;

	constructor(private navbarService: NavbarService, private route: ActivatedRoute, private searchService: SearchService) {
		this.navbarService.show();
	}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.searchQuery = params.q;

			this.searchResults = this.searchService.search(this.searchQuery);
		});
	}
}

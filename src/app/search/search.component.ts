import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	searchForm = new FormGroup({
		q: new FormControl(''),
	});

	constructor(private navbarService: NavbarService, private router: Router) {
		this.navbarService.show();
	}

	performSearch() {
		const source = this.searchForm.value;

		this.router.navigateByUrl('/results?q=' + encodeURIComponent(source.q));
	}
}

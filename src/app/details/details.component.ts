import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	constructor(private navbarService: NavbarService) {
		this.navbarService.show();
	}

	ngOnInit(): void {}
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	details: any;

	constructor(private navbarService: NavbarService, private activatedRoute: ActivatedRoute, private http: HttpClient) {
		this.navbarService.show();
	}

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			let id = params.get('id');

			if (id) {
				this.loadUser(id);
			}
		});
	}

	loadUser(id) {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Person/' + id).subscribe((a) => {
			this.setDetails(a);
		});
	}

	setDetails(details) {
		this.details = details;
	}
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	profile: any;

	constructor(private http: HttpClient, private navbarService: NavbarService, private activatedRoute: ActivatedRoute) {
		this.navbarService.show();
	}

	ngOnInit(): void {
		let usr = localStorage.getItem('user');

		this.activatedRoute.paramMap.subscribe((params) => {
			let id = params.get('id');

			if (id) {
				this.loadUser(id);
			} else {
				this.setProfile(JSON.parse(usr));
			}
		});
	}

	loadUser(id) {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Person/' + id).subscribe((a) => {
			this.setProfile(a);
		});
	}

	setProfile(profile) {
		this.profile = profile;
	}
}

import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-search-results-user-card',
	templateUrl: './user.card.html',
	// styleUrls: ['./user.card.scss'],
})
export class UserCardComponent {
	res: any;
	users: any;

	@Input('result') set result(a) {
		this.res = a;

		if (a) {
			this.loadUsers(a['ID']);
		}
	}

	constructor(private http: HttpClient) {}

	loadUsers(id) {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Person').subscribe((a) => {
			this.setUsers(id, a);
		});
	}

	setUsers(id, users: any[]) {
		this.res.users = users.filter((a) => {
			for (let v of a.tbPersonLabels) {
				if (id == v.LabelId) {
					return true;
				}
			}
			return false;
		});
	}

	initials(user) {
		const a: string = user?.FirstName || ' ';
		const b: string = user?.Surname || ' ';

		return (a.slice(0, 1) + b.slice(0, 1)).toUpperCase();
	}
}

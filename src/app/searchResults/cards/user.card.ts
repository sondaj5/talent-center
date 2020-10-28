import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-search-results-user-card',
	templateUrl: './user.card.html',
	// styleUrls: ['./user.card.scss'],
})
export class UserCardComponent {
	@Input() result: any;
}

import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-search-results-person-card',
	templateUrl: './person.card.html',
	styleUrls: ['./person.card.scss'],
})
export class PersonCardComponent {
	@Input() result: any;
}

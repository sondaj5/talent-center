import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';

const LABEL_GET_ALL_URL = 'https://www.tai-pan.net/ITC/api/Label';
const PERSON_GET_ALL_URL = 'https://www.tai-pan.net/ITC/api/Person';
const CATEGORY_GET_ALL_URL = 'https://www.tai-pan.net/ITC/api/Category';

export type SearchResults = {
	label: any[];
	person: any[];
	category: any[];
};

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	constructor(private http: HttpClient) {}

	search(q: string) {
		let results: SearchResults = {
			label: [],
			person: [],
			category: [],
		};

		const query = q.toLowerCase();

		combineLatest([
			this.http.get<any[]>(LABEL_GET_ALL_URL),
			this.http.get<any[]>(PERSON_GET_ALL_URL),
			this.http.get<any[]>(CATEGORY_GET_ALL_URL),
		]).subscribe((sections) => {
			sections.forEach((cat, i) => {
				switch (i) {
					case 0:
						results.label = this.filterResultsInCategory(cat, query);
						break;
					case 1:
						results.person = this.filterResultsInCategory(cat, query);
						break;
					case 2:
						results.category = this.filterResultsInCategory(cat, query);
						break;
				}
			});
		});

		console.warn(results);
		return results;
	}

	filterResultsInCategory(items: Object[], query: string) {
		let filtered: any[] = [];

		items.forEach((item) => {
			for (let prop in item) {
				if (item.hasOwnProperty(prop)) {
					if (typeof item[prop] != 'string') {
						continue;
					}

					const field: string = item[prop].toLowerCase();

					if (field.indexOf(query) >= 0) {
						filtered.push(item);
					}
				}
			}
		});

		return filtered;
	}
}

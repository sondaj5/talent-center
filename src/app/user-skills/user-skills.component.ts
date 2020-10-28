import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, mapTo, startWith, tap } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-user-skills',
	templateUrl: './user-skills.component.html',
	styleUrls: ['./user-skills.component.scss'],
})
export class UserSkillsComponent {
	visible = true;
	selectable = true;
	removable = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];
	fruitCtrl = new FormControl();
	filteredFruits: Observable<string[]>;
	fruits: string[] = [];

	selectedSkills: any[];

	@Input('userSkills') set fruit(a) {
		this.selectedSkills = a;
	}

	objectsSkills: any[];
	allFruits: any[];

	@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Label').subscribe((a) => {
			this.objectsSkills = a;
			this.allFruits = a.map((e) => e.Name);

			this.initAll();
		});
	}

	initAll() {
		this.selectedSkills.map((e) => {
			this.objectsSkills.map((d) => {
				if (e['$id'] == d['$id']) {
					this.fruits.push(d['Name']);
				}
			});
		});

		this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice()))
		);
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.fruits.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}

		this.fruitCtrl.setValue(null);
	}

	remove(fruit: string): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.fruits.push(event.option.viewValue);
		this.fruitInput.nativeElement.value = '';
		this.fruitCtrl.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.allFruits.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
	}
}

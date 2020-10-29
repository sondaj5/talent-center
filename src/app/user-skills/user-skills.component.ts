import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, mapTo, startWith, tap } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
	@Input() user: any;

	@Input('userSkills') set fruit(a) {
		this.selectedSkills = a;
		this.initAll();
	}

	objectsSkills: any[];
	allFruits: any[];

	@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor(private http: HttpClient, private router: Router) {}

	ngOnInit(): void {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Label').subscribe((a) => {
			this.objectsSkills = a;
			this.allFruits = a.map((e) => e.Name);

			this.initAll();
		});
	}

	initAll() {
		if (!this.selectedSkills || !this.objectsSkills) {
			return;
		}

		this.selectedSkills.map((e) => {
			this.objectsSkills.map((d) => {
				if (e['LabelId'] == d['ID']) {
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

		this.addLabelToUser(this.fruits[this.fruits.length - 1]);

		this.fruitCtrl.setValue(null);
	}

	remove(fruit: string): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
		}

		this.removeLabelToUser(fruit);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.fruits.push(event.option.viewValue);
		this.fruitInput.nativeElement.value = '';
		this.fruitCtrl.setValue(null);

		this.updateLabelToUser(event.option.viewValue);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.allFruits.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
	}

	selectedSkill(a) {
		this.objectsSkills.map((b) => {
			if (a == b.Name) {
				this.router.navigateByUrl('/details/' + b['ID']);
			}
		});
	}

	updateLabelsList(callback?) {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/Label').subscribe((a) => {
			this.objectsSkills = a;
			this.allFruits = a.map((e) => e.Name);

			if (callback) {
				callback();
			}
		});
	}
	objectsSkillsPerson: any[];
	updateLabelsConnectionsList(callback?) {
		this.http.get<any[]>('https://www.tai-pan.net/ITC/api/PersonLabel').subscribe((a) => {
			this.objectsSkillsPerson = a;

			if (callback) {
				callback(a);
			}
		});
	}

	loadUser(id) {
		return this.http.get<any>('https://www.tai-pan.net/ITC/api/Person/' + id);
	}

	addLabelToUser(label) {
		// this.loadUser(this.user.ID).subscribe((a) => {
		// 	for (let lab of a.tbPersonLabels) {
		// 		console.warn(lab);
		// 	}
		// });

		let body = new URLSearchParams();
		body.set('Name', label);
		body.set('LabelTypeID', '1');

		this.http
			.post<any>('https://www.tai-pan.net/ITC/api/Label', body.toString(), {
				headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
			})
			.subscribe((a) => {
				this.updateLabelToUser(label);
			});
	}

	removeLabelToUser(label?) {
		let continueProcess = (a) => {
			let list = a.filter((h) => parseInt(h['PersonId']) == parseInt(this.user['ID']));

			let newLabelId;
			this.objectsSkills.map((d) => {
				if (label == d['Name']) {
					newLabelId = d['ID'];
				}
			});

			let lista = list.filter((h) => parseInt(h['LabelId']) == parseInt(newLabelId));

			if (lista.length > 0) {
				this.http.delete<any>('https://www.tai-pan.net/ITC/api/PersonLabel/' + lista[0]['ID']).subscribe((a) => {
					console.warn('Label ' + label + ' removed for the user ' + this.user['LoginName']);
				});
			}

			console.warn(label, newLabelId, list);
		};

		this.updateLabelsConnectionsList(continueProcess);
	}

	updateLabelToUser(label) {
		let continueProcess = () => {
			let newLabelId;
			this.objectsSkills.map((d) => {
				if (label == d['Name']) {
					newLabelId = d['ID'];
				}
			});

			if (newLabelId) {
				newLabelId;

				let body = new URLSearchParams();
				body.set('PersonId', this.user['ID']);
				body.set('LabelId', newLabelId + '');

				this.http
					.post<any>('https://www.tai-pan.net/ITC/api/PersonLabel', body.toString(), {
						headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
					})
					.subscribe((a) => {
						console.warn('Label assigned to user');
					});
			}
		};

		this.updateLabelsList(continueProcess);
	}
}

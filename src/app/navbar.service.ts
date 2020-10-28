import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NavbarService {
	private navbarShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
	navbarVisible$: Observable<boolean> = this.navbarShow.asObservable();

	constructor() {}

	show() {
		this.navbarShow.next(true);
	}
	hide() {
		this.navbarShow.next(false);
	}
}

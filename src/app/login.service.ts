import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavbarService } from './navbar.service';

const LABEL_GET_USER_URL = 'https://www.tai-pan.net/ITC/api/Person';
@Injectable({
	providedIn: 'root',
})
export class LoginService {
	private fading: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());
	faded$: Observable<boolean> = this.fading.asObservable();

	private loginSub: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());
	isLogged: Observable<boolean> = this.loginSub.asObservable();

	private loginError: BehaviorSubject<string> = new BehaviorSubject(undefined);
	loginError$: Observable<string> = this.loginError.asObservable();

	registerError: BehaviorSubject<string> = new BehaviorSubject('5');
	registerError$: Observable<string> = this.loginError.asObservable();

	constructor(private http: HttpClient, private router: Router, private navbarService: NavbarService) {}

	login(login: string, password: string) {
		this.http.get<any[]>(LABEL_GET_USER_URL).subscribe((a) => {
			console.warn(a);
			if (!a.length) {
				this.loginError.next('Wrong username or password');
			}
			a.forEach((user) => {
				if (user.LoginName == login) {
					this.processLogin(login, password, user);
				}
			});

			if (!this.isLoggedIn()) {
				this.loginError.next('Wrong username or password');
			}
		});

		return;
	}

	processLogin(login, password, user) {
		this.router.navigateByUrl('/search');
		this.navbarService.show();

		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('login', login);
		localStorage.setItem('password', password);

		this.loginSub.next(true);
		this.loginError.next(undefined);
	}

	logout() {
		localStorage.clear();

		this.loginSub.next(false);
	}

	fadeIn() {
		this.fading.next(false);
	}
	fadeOut() {
		this.fading.next(true);
	}

	isLoggedIn() {
		return !!localStorage.getItem('login') && !!localStorage.getItem('password');
	}
}

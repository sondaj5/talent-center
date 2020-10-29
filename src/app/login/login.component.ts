import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { NavbarService } from '../navbar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LABEL_GET_USER_URL = 'https://www.tai-pan.net/ITC/api/Person';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		login: new FormControl(''),
		password: new FormControl(''),
	});

	registerForm = new FormGroup({
		FirstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
		Surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
		Department: new FormControl('', [Validators.required, Validators.minLength(2)]),
		LoginName: new FormControl('', [Validators.required, Validators.minLength(2)]),
		Password: new FormControl('', [Validators.required, Validators.minLength(2)]),
	});

	registration = false;

	loginError$ = this.loginService.loginError$;
	registerError;

	constructor(
		private router: Router,
		private http: HttpClient,
		private loginService: LoginService,
		private navbarService: NavbarService
	) {
		this.navbarService.hide();
	}

	ngOnInit(): void {}

	register() {
		this.registration = true;
		return false;
	}

	submitRegisterForm() {
		const source = this.registerForm.value;

		if (this.registerForm.invalid) {
			this.registerError = 'All the fields are required';
			return false;
		} else {
			this.createUser(source);

			this.registerError = undefined;
		}

		return false;
	}
	submitLoginForm() {
		const source = this.loginForm.value;

		const login = source.login;
		const password = source.password;

		this.loginService.login(login, password);

		return false;
	}

	createUser(data) {
		let body = new URLSearchParams();

		for (let k in data) {
			body.set(k, data[k]);
		}

		this.http
			.post<any>(LABEL_GET_USER_URL, body.toString(), {
				headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
			})
			.subscribe(
				(a) => {
					this.registerError = undefined;

					this.loginService.login(data['LoginName'], data['Password']);
				},
				(error) => {
					this.registerError = 'User already exists';

					console.warn(error);
				}
			);
	}
}

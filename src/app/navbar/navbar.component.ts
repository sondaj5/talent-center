import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	loggedIn = this.loginService.isLogged;
	visibe$ = this.navbarService.navbarVisible$;

	constructor(private router: Router, private loginService: LoginService, private navbarService: NavbarService) {}

	ngOnInit(): void {}

	updateControls() {}

	logout() {
		this.loginService.logout();
		this.router.navigateByUrl('/');
	}
}

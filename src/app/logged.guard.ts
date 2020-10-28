import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
	providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
	constructor(private loginService: LoginService, private route: Router) {}
	canActivate() {
		const pass = this.loginService.isLoggedIn();

		if (!pass) {
			this.route.navigateByUrl('/');
		}

		return pass;
	}
}

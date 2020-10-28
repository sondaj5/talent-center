import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	@ViewChild('videoPlayer', { static: true }) myVideo: ElementRef;

	videoIs: BehaviorSubject<boolean> = new BehaviorSubject(false);

	fading$ = this.loginService.faded$;
	hasVideo$ = this.videoIs.asObservable();

	fade2: BehaviorSubject<boolean> = new BehaviorSubject(false);
	fade2Out: BehaviorSubject<boolean> = new BehaviorSubject(false);

	fading2$ = this.videoIs.asObservable();
	fading2Out$ = this.videoIs.asObservable();

	timeout: any;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if (event.url == '/search' || event.urlAfterRedirects == '/search') {
					this.loginService.fadeOut();

					this.playVideo(true);
				} else {
					this.loginService.fadeIn();

					this.playVideo(false);
				}

				if (
					event.url == '/login' ||
					event.urlAfterRedirects == '/login' ||
					event.url == '/search' ||
					event.urlAfterRedirects == '/search'
				) {
					this.videoIs.next(true);
				} else {
					this.videoIs.next(false);
				}

				if (
					event.url == '/details' ||
					event.urlAfterRedirects == '/details' ||
					event.url == '/profile' ||
					event.urlAfterRedirects == '/profile'
				) {
					this.fade2.next(true);
				} else {
					this.fade2Out.next(true);
				}
			}
		});
	}

	playVideo(play: boolean) {
		const video: any = this.myVideo?.nativeElement;

		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		if (!video) {
			return;
		}
		if (play) {
			video.play();
		} else {
			this.timeout = setTimeout(() => video.pause(), 1200);
		}
	}
}

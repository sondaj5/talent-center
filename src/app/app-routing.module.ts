import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { LoggedGuard } from './logged.guard';
import { LoginComponent } from './login/login.component';
import { NotLoggedGuard } from './not-logged.guard';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './searchResults/searchResults.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'search', component: SearchComponent, canActivate: [LoggedGuard] },
	{ path: 'results', component: SearchResultsComponent, canActivate: [LoggedGuard] },
	{ path: 'details', component: DetailsComponent, canActivate: [LoggedGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard] },
	{ path: 'profile/:id', component: ProfileComponent, canActivate: [LoggedGuard] },
	{ path: '**', redirectTo: 'login' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

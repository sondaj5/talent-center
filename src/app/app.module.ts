import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './searchResults/searchResults.component';
import { ProfileComponent } from './profile/profile.component';
import { UserCardComponent } from './searchResults/cards/user.card';
import { PersonCardComponent } from './searchResults/cards/person.card';
import { UserSkillsComponent } from './user-skills/user-skills.component';

@NgModule({
	declarations: [
		AppComponent,
		SearchComponent,
		SearchResultsComponent,
		NavbarComponent,
		DetailsComponent,
		LoginComponent,
		ProfileComponent,
		UserCardComponent,
		PersonCardComponent,
		UserSkillsComponent,
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		CommonModule,
		BrowserModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

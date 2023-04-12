import { WebsiteModule } from './routing/website/website.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent, HomePageComponent],
	imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, WebsiteModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { OurTeamPageComponent } from './pages/our-team-page/our-team-page.component';
import { HomeAppPageComponent } from './pages/home-app-page/home-app-page.component';
import { RecipetoriaAppComponent } from './recipetoria-app.component';
import { RecipetoriaAppRoutingModule } from './recipetoria-app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [
		RecipetoriaAppComponent,
		ShoppingListComponent,
		HeaderComponent,
		FooterComponent,
		OurTeamPageComponent,
		HomeAppPageComponent
	],
	imports: [
		RecipetoriaAppRoutingModule,
		CommonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		FormsModule,
		MatSelectModule,
		MatButtonModule,
		MatCheckboxModule
	],
	providers: [],
	bootstrap: [RecipetoriaAppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipetoriaAppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipetoriaAppComponent } from './recipetoria-app.component';
import { OurTeamPageComponent } from './pages/our-team-page/our-team-page.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const recipetoriaRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'RecipetoriaAppComponent' },
	{
		path: '',
		component: RecipetoriaAppComponent,
		children: [
			{ path: 'our-team', component: OurTeamPageComponent },
			{ path: 'shopping-list', component: ShoppingListComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(recipetoriaRoutes)],
	exports: [RouterModule]
})
export class RecipetoriaAppRoutingModule {}

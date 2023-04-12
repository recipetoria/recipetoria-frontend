import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
	{
		path: 'app',
		loadChildren: () => import('./routing/recipetoria-app/recipetoria-app.module').then(m => m.RecipetoriaAppModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./routing/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'not-found',
		loadChildren: () => import('./routing/not-found/not-found.module').then(m => m.NotFoundModule)
	},
	{
		path: '**',
		redirectTo: 'not-found'
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
	schemas: []
})
export class WebsiteModule {}

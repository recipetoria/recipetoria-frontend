import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { RouterModule } from '@angular/router';
import { ShopListPageComponent } from './pages/shop-list-page/shop-list-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

@NgModule({
	declarations: [AppPageComponent, ShopListPageComponent, HeaderComponent, FooterComponent, ShoppingListComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'app'
			},
			{
				path: 'app',
				component: AppPageComponent
			}
		])
	]
})
export class AppModule {}

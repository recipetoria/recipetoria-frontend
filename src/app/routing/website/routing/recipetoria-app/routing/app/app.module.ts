import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppPageComponent],
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

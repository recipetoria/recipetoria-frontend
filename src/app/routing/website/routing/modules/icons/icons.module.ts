import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
	declarations: [],
	imports: [CommonModule]
})
export class IconsModule {
	private iconUrl = 'assets/img/svg/icons';
	constructor(private sanitaizer: DomSanitizer, public matIconRegistry: MatIconRegistry) {
		matIconRegistry
			.addSvgIcon('delete', this.setPath(`${this.iconUrl}/delete-icon.svg`))
			.addSvgIcon('print', this.setPath(`${this.iconUrl}/print-icon.svg`));
	}
	private setPath(url: string): SafeResourceUrl {
		return this.sanitaizer.bypassSecurityTrustResourceUrl(url);
	}
}

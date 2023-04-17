import { Component, OnInit } from '@angular/core';
import { IShoppingList, ShoppingListColumns } from './ishopping-list';
import { ShoppingListService } from './shopping-list.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
	dataItems = new MatTableDataSource<IShoppingList>();
	displayedColumns: string[] = ShoppingListColumns.map(col => col.key);
	columnsSchema: any = ShoppingListColumns;
	valid: any = {};
	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit(): void {
		this.shoppingListService.getAllItems().subscribe(data => {
			this.dataItems.data = data;
		});
	}
	addRow() {
		const newRow: IShoppingList = <IShoppingList>{
			isSelected: false,
			id: 0,
			name: '',
			// firstName: '',
			amount: 0,
			measurementUnit: '',
			isEdit: false,
			applicationUser: {}
		};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.dataItems.data = [newRow, ...this.dataItems.data];
	}

	editRow(row: IShoppingList) {
		if (row.id === 0) {
			this.shoppingListService.addItem(row).subscribe((newItem: IShoppingList) => {
				row.id = newItem.id;
				row.isEdit = false;
			});
		} else {
			this.shoppingListService.updateUser(row).subscribe(() => (row.isEdit = false));
		}
	}

	removeRow(id: number) {
		this.shoppingListService.deleteItem(id).subscribe(() => {
			this.dataItems.data = this.dataItems.data.filter((i: IShoppingList) => i.id == id);
			// this.dataItems.data = this.dataItems.data.splice(id, 1);
		});
	}
	inputHandler(e: any, id: number, key: string) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (!this.valid[id]) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this.valid[id] = {};
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		this.valid[id][key] = e.target.validity.valid;
	}

	disableSubmit(id: number) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (this.valid[id]) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
			return Object.values(this.valid[id]).some(item => item === false);
		}
		return false;
	}

	isAllSelected() {
		return this.dataItems.data.every(item => item.isSelected);
	}

	isAnySelected() {
		return this.dataItems.data.some(item => item.isSelected);
	}

	selectAll(event: any) {
		this.dataItems.data = this.dataItems.data.map(item => ({
			...item,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
			isSelected: event.checked
		}));
	}
}

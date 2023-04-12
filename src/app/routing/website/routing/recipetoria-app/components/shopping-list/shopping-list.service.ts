import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IShoppingList } from './ishopping-list';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	private url = 'https://recipetoria-production-f60b.up.railway.app/api/v1/client/ingredients';
	// private url = 'https://dummyjson.com/products';
	constructor(private http: HttpClient) {}

	getAllItems(): Observable<IShoppingList[]> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
		return this.http.get(this.url).pipe<IShoppingList[]>(map((data: any) => data));
	}
	updateUser(item: IShoppingList): Observable<IShoppingList> {
		return this.http.patch<IShoppingList>(`${this.url}/${item.id}`, item);
	}
	addItem(item: IShoppingList): Observable<IShoppingList> {
		return this.http.post<IShoppingList>(`${this.url}/add`, item);
	}

	deleteItem(id: number): Observable<IShoppingList> {
		return this.http.delete<IShoppingList>(`${this.url}/${id}`);
	}

	deleteItems(items: IShoppingList[]): Observable<IShoppingList[]> {
		return forkJoin(items.map(item => this.http.delete<IShoppingList>(`${this.url}/${item.id}`)));
	}

	getItemById(id: number) {
		return this.http.get<IShoppingList[]>(`${this.url}/${id}`);
	}
}

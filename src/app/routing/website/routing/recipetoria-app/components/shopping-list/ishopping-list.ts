export interface IShoppingList {
	isSelected: boolean;
	id: number;
	name: string;
	// firstName: string;
	amount: number;
	measurementUnit: string;
	isEdit: boolean;
	applicationUser: IApplicationUser;
}

export interface IApplicationUser {
	id: number;
	applicationUserRole: string;
	email: string;
	password: string;
	name: string;
	photo: string;
	enabled: boolean;
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
	username: string;
	authorities: IAuth;
}

export interface IAuth {
	authority: string;
}

export const ShoppingListColumns = [
	{
		key: 'isSelected',
		type: 'isSelected',
		label: ''
	},
	// {
	// 	key: 'id',
	// 	type: 'id',
	// 	label: ''
	// },
	{
		key: 'name',
		type: 'name',
		label: 'Name',
		required: true
	},
	{
		key: 'amount',
		type: 'amount',
		label: 'Amount'
	},
	{
		key: 'measurementUnit',
		type: 'measurementUnit',
		label: 'Measure'
	},
	{
		key: 'isEdit',
		type: 'isEdit',
		label: ''
	}
];
// ['#', 'name', 'amount', 'measure', 'delete']

// export interface IMeasure {
// 	value: string;
// 	measure: string;
//}

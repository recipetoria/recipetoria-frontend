import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableItem.scss";

/* eslint-disable jsx-a11y/control-has-associated-label */
interface IShoppingListTableItem {
  id: number;
  name: string;
  amount: number;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { id, name, amount } = props;

  return (
    <tr className="shopping-list-table-item">
      <td className="td-id">{id}</td>
      <td className="td-name">{name}</td>
      <td className="td-amount">{amount}</td>
      <td>
        <select name="measure" className="td-select">
          <option value="table spoon">table spoon</option>
        </select>
      </td>
      <td className="td-trash">
        <Trash />
      </td>
    </tr>
  );
}

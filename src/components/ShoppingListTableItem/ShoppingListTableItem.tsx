import Trash from "../../assets/svg/Trash";

/* eslint-disable jsx-a11y/control-has-associated-label */
interface IShoppingListTableItem {
  id: number;
  name: string;
  amount: number;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { id, name, amount } = props;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{amount}</td>
      <td>
        <select name="measure">
          <option value="table spoon">table spoon</option>
        </select>
      </td>
      <td>
        <Trash />
      </td>
    </tr>
  );
}

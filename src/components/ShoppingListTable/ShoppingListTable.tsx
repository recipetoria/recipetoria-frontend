import "./ShoppingListTable.scss";
import { Ingredient } from "../../types/types";
import Table from "../Table/Table";

export default function ShoppingListTable(props: {
  shopListArr: Ingredient[];
}) {
  const { shopListArr } = props;

  return (
    <div className="shopping-list-table">
      <Table mode="shopList" ingredientsObj={shopListArr} />
    </div>
  );
}

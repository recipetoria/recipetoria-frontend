import { FocusEvent } from "react";
import { IShoppingListItems } from "../types/types";

export default function getObjectForUpdate(
  e: FocusEvent<HTMLDivElement, Element>,
  objArr: IShoppingListItems[],
  field: string
) {
  const foundIndexFromStore = objArr.findIndex(
    (item) => item.id === +e.currentTarget.id
  );

  const foundElFromStore = objArr[foundIndexFromStore];
  let newEl: IShoppingListItems = {
    id: 0,
    name: "",
    amount: 0,
  };
  (Object.keys(foundElFromStore) as (keyof typeof foundElFromStore)[]).forEach(
    (key) => {
      if (field && key === field) {
        newEl = {
          id: foundElFromStore.id,
          name: foundElFromStore.name,
          amount: foundElFromStore.amount,
        };
        newEl[key] = e.currentTarget.textContent as never;
      }
    }
  );
  return newEl;
}

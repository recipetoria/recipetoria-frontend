import { IShoppingListItems } from "../types/types";

export default function getObjectForUpdate(
  id: number,
  value: string | number,
  objArr: IShoppingListItems[],
  field: string
) {
  let newEl: IShoppingListItems = {
    id: 0,
    name: "",
    amount: 0,
    measure: "",
  };
  const foundIndexFromStore = objArr.findIndex((item) => item.id === id);

  const foundElFromStore = objArr[foundIndexFromStore];

  (Object.keys(foundElFromStore) as (keyof typeof foundElFromStore)[]).forEach(
    (key) => {
      if (field && key === field) {
        newEl = {
          id: foundElFromStore.id,
          name: foundElFromStore.name,
          amount: foundElFromStore.amount,
          measure: foundElFromStore.measure,
        };
        newEl[key] = value as never;
      }
    }
  );
  return newEl;
}

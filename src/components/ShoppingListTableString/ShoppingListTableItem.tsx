import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IShoppingListItems } from "../../types/types";
import { updateShopElement } from "../../features/ShopListSlice";

interface IShoppingListTableItem {
  isLined: boolean;
  defaultValue: number | string;
  classMode: string;
  editMode: string;
  canItBeEmpty: boolean;
  id: number;
  field: string;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const {
    isLined,
    defaultValue,
    classMode,
    editMode,
    canItBeEmpty,
    id,
    field,
  } = props;
  const [value, setValue] = useState<string | number>(defaultValue);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const shoppingItems = useAppSelector((state) => state.shopList.value);

  return (
    <div className={`td ${isLined ? "td__with-line" : ""}`}>
      <div
        id={id.toString()}
        className={`td__button ${classMode} ${
          value ? "" : "td__button_empty"
        } ${error ? "td__button_error" : ""}`}
        onInput={(e) => {
          if (e.currentTarget.textContent) {
            setValue(e.currentTarget.textContent);
            e.currentTarget.focus();
            const sel = document.getSelection();
            sel?.setBaseAndExtent(
              e.currentTarget,
              e.currentTarget.childNodes.length,
              e.currentTarget,
              e.currentTarget.childNodes.length
            );
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          if (
            e.currentTarget.textContent?.trim() === "" &&
            canItBeEmpty === false
          ) {
            e.currentTarget.focus();
            setError("Can't be empty");
          } else if (field !== "id") {
            const foundIndexFromStore = shoppingItems.findIndex(
              (item) => item.id === +e.currentTarget.id
            );

            const foundElFromStore = shoppingItems[foundIndexFromStore];

            (
              Object.keys(foundElFromStore) as (keyof typeof foundElFromStore)[]
            ).forEach((key) => {
              if (field && key === field) {
                const newEl: IShoppingListItems = {
                  name: foundElFromStore.name,
                  id: foundElFromStore.id,
                  amount: foundElFromStore.amount,
                };
                newEl[key] = e.currentTarget.textContent as never;
                dispatch(updateShopElement(newEl));
              }
            });

            setError("");
          }
        }}
        contentEditable={field !== "id"}
        suppressContentEditableWarning
        role="textbox"
        tabIndex={0}
      >
        {value}
      </div>
      {error ? <p className="error">{error}</p> : ""}
    </div>
  );
}

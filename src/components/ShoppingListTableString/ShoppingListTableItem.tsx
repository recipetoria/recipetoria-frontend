import { useState } from "react";

interface IShoppingListTableItem {
  isLined: boolean;
  defaultValue: number | string;
  classMode: string;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { isLined, defaultValue, classMode } = props;
  const [value, setValue] = useState<string | number>(defaultValue);

  return (
    <div className={`td ${isLined ? "td__with-line" : ""}`}>
      <div
        className={`td__button ${classMode}`}
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
            e.currentTarget.blur();
          }
        }}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        tabIndex={0}
      >
        {value}
      </div>
    </div>
  );
}

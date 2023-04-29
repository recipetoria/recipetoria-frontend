import { useState } from "react";

interface IShoppingListTableItem {
  isLined: boolean;
  defaultValue: number | string;
  classMode: string;
  editMode: string;
  canItBeEmpty: boolean;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { isLined, defaultValue, classMode, editMode, canItBeEmpty } = props;
  const [value, setValue] = useState<string | number>(defaultValue);
  const [error, setError] = useState("");

  return (
    <div className={`td ${isLined ? "td__with-line" : ""}`}>
      <div
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
          } else {
            setError("");
          }
        }}
        contentEditable
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

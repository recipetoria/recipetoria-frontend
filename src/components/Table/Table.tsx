import { CSSProperties } from "styled-components";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import PlusIcon from "../../assets/svg/PlusIcon";
import Trash from "../../assets/svg/Trash";
import { Ingredient } from "../../types/types";
import "./Table.scss";

interface TableProps {
  mode: "withAction" | "noAction";
  ingredientsObj: Ingredient[];
}

interface TableValues {
  name: string;
}

export default function Table(props: TableProps) {
  const { mode, ingredientsObj } = props;

  const { register, handleSubmit, reset } = useForm<TableValues>();

  const cellStyle: CSSProperties = {
    padding: "8px 0.833vw",
    cursor: "pointer",
  };

  return (
    <section className="grid-table">
      <div className="grid-table__row grid-table__row_header">
        <div className="grid-table__number grid-table__number_header cell cell_header">
          #
        </div>
        <div className="grid-table__data-wrapper">
          <div className="grid-table__name cell cell_header">Name</div>
          <div className="grid-table__amount cell cell_header">Amount</div>
          <div className="grid-table__measure cell cell_header">Measure</div>
        </div>
        {mode === "withAction" ? (
          <div className="grid-table__action grid-table__action_header cell cell_header">
            Action
          </div>
        ) : (
          ""
        )}
        <div className="grid-table__delete cell cell_header">Delete</div>
      </div>
      {ingredientsObj.map((objItem, indx) => {
        return (
          <div
            className="grid-table__row"
            key={`row-${objItem.name}-${objItem.id}`}
          >
            <div className="grid-table__number cell">{indx + 1}</div>
            <div className="grid-table__data-wrapper">
              <form className="grid-table__from">
                <TextField
                  multiline
                  defaultValue={objItem.name}
                  required
                  placeholder="Type ingredient name..."
                  size="small"
                  inputProps={{
                    style: cellStyle,
                  }}
                />
              </form>
              <div className="grid-table__amount cell">{objItem.amount}</div>
              <div className="grid-table__measure cell">
                {objItem.measurementUnit}
              </div>
            </div>
            {mode === "withAction" ? (
              <button
                type="button"
                className="grid-table__action cell cell_btn"
              >
                <PlusIcon />
                <span>Add to shop list</span>
              </button>
            ) : (
              ""
            )}
            <button type="button" className="grid-table__delete cell cell_btn">
              <Trash />
            </button>
          </div>
        );
      })}
    </section>
  );
}

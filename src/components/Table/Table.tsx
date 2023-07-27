/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { CSSProperties } from "styled-components";
import { MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PlusIcon from "../../assets/svg/PlusIcon";
import Trash from "../../assets/svg/Trash";
import { Ingredient } from "../../types/types";
import "./Table.scss";
import measureValues from "../../assets/data/measureArray";

interface TableProps {
  mode: "withAction" | "noAction";
  ingredientsObj: Ingredient[];
}

interface TableValues {
  name: string;
  amount: number;
  measure: string;
}

export default function Table(props: TableProps) {
  const { mode, ingredientsObj } = props;

  const {
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<TableValues>();

  const [isHoveredByTrashId, setIsHoveredByTrashId] = useState<number | null>(
    null
  );

  const [isActiveAddNewItem, setIsActiveAddNewItem] = useState(false);

  const cellStyle: CSSProperties = {
    padding: "8px 0.833vw",
    cursor: "pointer",
  };

  const [selectValueNewItem, setSelectValueNewItem] = useState("select");

  const handleSubmitNewItem = (data: TableValues) => {
    const { name, amount } = data;

    if (name || amount || selectValueNewItem !== "select") {
      if (name) {
        console.log(name, amount, selectValueNewItem);
      } else {
        setError("name", { message: "Name is required" });
      }
    } else {
      reset();
      setIsActiveAddNewItem(false);
    }
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
            className={`grid-table__row ${
              isHoveredByTrashId === indx
                ? "grid-table__row_hover-by-trash"
                : ""
            }`}
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
              <form className="grid-table__from">
                <TextField
                  multiline
                  defaultValue={objItem.amount}
                  required
                  type="number"
                  size="small"
                  inputProps={{
                    style: { ...cellStyle, textAlign: "right" },
                  }}
                />
              </form>
              <form className="grid-table__from">
                <TextField
                  select
                  defaultValue={
                    objItem.measurementUnit?.toLowerCase() || "select"
                  }
                  required
                  type="number"
                  size="small"
                  onChange={(e) => console.log(e.target.value)}
                  fullWidth
                  sx={{
                    width: "8.264vw",
                    maxWidth: "143px",
                  }}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        height: "224px",
                        padding: "8px 0",
                        bottom: 0,
                      },
                      PaperProps: {
                        sx: {
                          bg: "transparent",
                          boxShadow: "2px 2px 0px 0px #000",
                          border: "1px solid #2D2B2B",
                          borderRadius: "4px",
                          scrollbarWidth: "thin",
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            width: "4px",
                            margin: "8px",
                            bgcolor: "transparent",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            bgcolor: "#94959A",
                            borderRadius: "100px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            background: "#555",
                          },
                        },
                      },
                    },
                  }}
                >
                  {measureValues.sort().map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.toLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </form>
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
            <form className="grid-table__from grid-table__from_delete">
              <button
                type="button"
                className="grid-table__delete cell cell_btn"
                onMouseEnter={() => {
                  setIsHoveredByTrashId(indx);
                }}
                onMouseLeave={() => {
                  setIsHoveredByTrashId(null);
                }}
              >
                <Trash />
              </button>
              <span className="caption">Delete</span>
            </form>
          </div>
        );
      })}
      {isActiveAddNewItem ? (
        <>
          <button
            type="button"
            className="form-mask"
            onClick={handleSubmit(handleSubmitNewItem)}
          >
            {" "}
          </button>
          <form
            onSubmit={handleSubmit(handleSubmitNewItem)}
            className={`grid-table__row grid-table__row_form-new-item ${
              isHoveredByTrashId === ingredientsObj.length
                ? "grid-table__row_hover-by-trash"
                : ""
            }`}
            style={{ borderTop: "none" }}
          >
            <div className="grid-table__number cell">
              {ingredientsObj.length + 1}
            </div>
            <div className="grid-table__data-wrapper">
              <div className="grid-table__from">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      required
                      placeholder="Type ingredient name..."
                      size="small"
                      inputProps={{
                        style: {
                          ...cellStyle,
                          border: "1px solid #D9D9D9",
                          borderRadius: "4px",
                        },
                      }}
                      {...field}
                      autoFocus
                      error={errors.name?.message !== ""}
                      helperText={
                        errors.name?.message === "" ? "" : errors.name?.message
                      }
                    />
                  )}
                />
              </div>
              <div className="grid-table__from">
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      type="number"
                      size="small"
                      inputProps={{
                        style: {
                          ...cellStyle,
                          textAlign: "right",
                          border: "1px solid #D9D9D9",
                          borderRadius: "4px",
                        },
                      }}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid-table__from">
                <Controller
                  name="measure"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      type="number"
                      size="small"
                      fullWidth
                      {...field}
                      onChange={(e) => setSelectValueNewItem(e.target.value)}
                      value={selectValueNewItem}
                      sx={{
                        width: "8.264vw",
                        maxWidth: "143px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "4px",
                      }}
                      SelectProps={{
                        MenuProps: {
                          style: {
                            height: "224px",
                            padding: "8px 0",
                            bottom: 0,
                          },
                          PaperProps: {
                            sx: {
                              bg: "transparent",
                              boxShadow: "2px 2px 0px 0px #000",
                              border: "1px solid #2D2B2B",
                              borderRadius: "4px",
                              scrollbarWidth: "thin",
                              "&::-webkit-scrollbar": {
                                width: "4px",
                              },
                              "&::-webkit-scrollbar-track": {
                                width: "4px",
                                margin: "8px",
                                bgcolor: "transparent",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                bgcolor: "#94959A",
                                borderRadius: "100px",
                              },
                              "&::-webkit-scrollbar-thumb:hover": {
                                background: "#555",
                              },
                            },
                          },
                        },
                      }}
                    >
                      {measureValues.sort().map((item) => (
                        <MenuItem key={item} value={item}>
                          {item.toLowerCase()}
                        </MenuItem>
                      ))}
                      <MenuItem value="select" style={{ display: "none" }}>
                        select
                      </MenuItem>
                    </TextField>
                  )}
                />
              </div>
            </div>
            {mode === "withAction" ? <div /> : ""}
            <div className="grid-table__from grid-table__from_delete">
              <button
                type="button"
                className="grid-table__delete cell cell_btn"
                onMouseEnter={() => {
                  setIsHoveredByTrashId(ingredientsObj.length);
                }}
                onMouseLeave={() => {
                  setIsHoveredByTrashId(null);
                }}
                onClick={() => {
                  reset();
                  setIsActiveAddNewItem(false);
                  setIsHoveredByTrashId(null);
                }}
              >
                <Trash />
              </button>
              <span className="caption">Delete</span>
            </div>
          </form>
        </>
      ) : (
        <button
          type="button"
          className="grid-table__new-item-btn"
          onClick={() => {
            setIsActiveAddNewItem(true);
          }}
        >
          <span className="grid-table__add-btn-plus">+</span>
          <span>Add new item</span>
        </button>
      )}
    </section>
  );
}
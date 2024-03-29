/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Ingredient, TableProps, TableValues } from "../../types/types";
import "./Table.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAddIngredientFromRecipeToShopList,
  fetchDeleteIngredient,
  fetchUpdateIngredient,
  fetchUpdateRecipeInfo,
} from "../../features/OneRecipeSlice";
import {
  fetchUpdateIngredientFromShopList,
  fetchCreateNewIngredient,
  fetchDeleteIngredientFromShopList,
} from "../../features/ShoppingListSlice";
import SelectMeasure from "./Cells/SelectMeasure";
import CellName from "./Cells/CellName";
import CellAmount from "./Cells/CellAmount";
import useResize from "../../hooks/useResize";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import CellAction from "./Cells/CellAction";
import AddToShopListBtn from "./Btns/AddToShopListBtn";

export default function Table(props: TableProps) {
  const { mode, ingredientsObj, parentObj } = props;

  const sortedIngredientsObj = [...ingredientsObj].sort((a, b) => {
    if (a.id && b.id) {
      return a.id - b.id;
    }
    return 1;
  });

  const { handleSubmit, reset, control, setValue, setError } =
    useForm<TableValues>({
      mode: "all",
    });

  const { fields } = useFieldArray({
    control,
    name: "ingredient",
    keyName: "_id",
  });

  useEffect(() => {
    setValue("ingredient", sortedIngredientsObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsObj.length]);

  const dispatch = useAppDispatch();
  const { isScreenSm } = useResize();

  const token = useAppSelector((state) => state.present.authData.value.token);

  const [isHoveredByTrashId, setIsHoveredByTrashId] = useState<number | null>(
    null
  );

  const [isActiveAddNewItem, setIsActiveAddNewItem] = useState(false);

  // states for cells thats changed
  const [changedIngredientData, setChangedIngredientData] = useState<{
    name: string | null;
    amount: number | null;
    measure: string | null;
  }>({
    name: null,
    amount: null,
    measure: null,
  });

  const [selectValueNewItem, setSelectValueNewItem] = useState("select");

  const handleSubmitChangeItem = (ingredientObj: Ingredient) => {
    const { id, name, amount, measurementUnit } = ingredientObj;

    if (
      changedIngredientData.name ||
      changedIngredientData.amount ||
      changedIngredientData.measure
    ) {
      if (mode === "recipe" && parentObj) {
        dispatch(
          fetchUpdateIngredient({
            recipeId: parentObj.id,
            token,
            ingredientId: id,
            updatedIngredientInfo: {
              name: changedIngredientData.name || name,
              amount: changedIngredientData.amount || amount,
              measurementUnit:
                changedIngredientData.measure?.toUpperCase() ||
                measurementUnit?.toUpperCase() ||
                null,
            },
          })
        );
      } else if (mode === "shopList") {
        dispatch(
          fetchUpdateIngredientFromShopList({
            token,
            ingredientId: id,
            updatedIngredientInfo: {
              name: changedIngredientData.name || name,
              amount: changedIngredientData.amount || amount,
              measurementUnit:
                changedIngredientData.measure?.toUpperCase() ||
                measurementUnit?.toUpperCase() ||
                null,
            },
          })
        );
      }
      setSelectValueNewItem("select");
    }
  };

  const handleSubmitNewItem = (data: TableValues) => {
    const { name, amount } = data.newIngredient;

    if (name || amount || selectValueNewItem !== "select") {
      if (name) {
        const newIngredientData = {
          name,
          amount,
          measurementUnit:
            selectValueNewItem === "select"
              ? null
              : selectValueNewItem.toUpperCase(),
        };

        if (mode === "recipe" && parentObj) {
          dispatch(
            fetchUpdateRecipeInfo({
              infoRecipeData: {
                name: parentObj.name,
                ingredientDTOs:
                  parentObj.ingredientDTOs !== null &&
                  parentObj.ingredientDTOs.length > 0
                    ? [...sortedIngredientsObj, newIngredientData]
                    : [newIngredientData],
              },
              recipeId: parentObj.id,
              token,
            })
          );
        } else if (mode === "shopList") {
          dispatch(
            fetchCreateNewIngredient({
              token,
              data: newIngredientData,
            })
          );
        }
        reset();
        setIsActiveAddNewItem(false);
        setSelectValueNewItem("select");
      }
    } else {
      reset();
      setIsActiveAddNewItem(false);
      setSelectValueNewItem("select");
    }
  };

  return (
    <section className="grid-table">
      <div
        className={`grid-table__row grid-table__row_header ${
          mode === "shopList" ? "grid-table__row_new-grid" : ""
        }`}
      >
        <div className="grid-table__number grid-table__number_header cell cell_header">
          #
        </div>
        <div
          className={`grid-table__data-wrapper ${
            mode === "shopList" ? "grid-table__data-wrapper_new-grid" : ""
          }`}
        >
          <div className="grid-table__name cell cell_header">Name</div>
          <div className="grid-table__amount cell cell_header cell_header-amount">
            Amount
          </div>
          <div className="grid-table__measure cell cell_header">Unit</div>
        </div>
        <div className="grid-table__delete grid-table__delete_header cell cell_header">
          Action
        </div>
        {mode === "recipe" ? (
          <div className="grid-table__action grid-table__action_header cell cell_header" />
        ) : (
          ""
        )}
      </div>
      {fields.map((objItem, indx) => {
        return (
          <div
            className={`grid-table__row ${
              isHoveredByTrashId === indx
                ? "grid-table__row_hover-by-trash"
                : ""
            } ${mode === "shopList" ? "grid-table__row_new-grid" : ""}`}
            key={`row-${objItem.name}-${objItem.id}`}
          >
            <div className="grid-table__number cell">{indx + 1}</div>
            <div
              className={`grid-table__data-wrapper ${
                mode === "shopList" ? "grid-table__data-wrapper_new-grid" : ""
              }`}
            >
              <form
                className="grid-table__from grid-table__from_name"
                onSubmit={() => handleSubmitChangeItem(objItem)}
                onBlur={() => handleSubmitChangeItem(objItem)}
              >
                <CellName
                  name={`ingredient.${indx}.name`}
                  control={control}
                  withBorder={false}
                  autoFocus={false}
                  changedIngredientData={changedIngredientData}
                  setChangedIngredientData={(value) =>
                    setChangedIngredientData(value)
                  }
                />
              </form>
              <form
                className="grid-table__from grid-table__from_amount"
                onSubmit={() => handleSubmitChangeItem(objItem)}
                onBlur={() => handleSubmitChangeItem(objItem)}
              >
                <CellAmount
                  name={`ingredient.${indx}.amount`}
                  control={control}
                  withBorder={false}
                  changedIngredientData={changedIngredientData}
                  setChangedIngredientData={(value) =>
                    setChangedIngredientData(value)
                  }
                />
              </form>
              <form
                className="grid-table__from grid-table__from_measure"
                onSubmit={() => handleSubmitChangeItem(objItem)}
                onBlur={() => handleSubmitChangeItem(objItem)}
              >
                <SelectMeasure
                  control={control}
                  name="newIngredient.measurementUnit"
                  setSelectValueNewItem={(value) =>
                    setSelectValueNewItem(value)
                  }
                  defaultValue={objItem.measurementUnit?.toLowerCase()}
                  changedIngredientData={changedIngredientData}
                  setChangedIngredientData={(value) =>
                    setChangedIngredientData(value)
                  }
                  withBorder={false}
                />
              </form>
            </div>
            <CellAction
              handleSaveClick={() => handleSubmitChangeItem(objItem)}
              setIsHoveredByTrashId={(value) => setIsHoveredByTrashId(value)}
              ingredientIndex={indx}
              handleTrashClick={() => {
                if (mode === "recipe" && parentObj) {
                  dispatch(
                    fetchDeleteIngredient({
                      recipeId: parentObj.id,
                      token,
                      ingredientId: objItem.id,
                    })
                  );
                } else if (mode === "shopList") {
                  dispatch(
                    fetchDeleteIngredientFromShopList({
                      token,
                      ingredientId: objItem.id,
                    })
                  );
                }
                dispatch(
                  SnackbarTextValue({
                    text: "The row was moved to trash",
                    withUndo: true,
                  })
                );
              }}
            />
            {mode === "recipe" ? (
              <AddToShopListBtn
                handleClick={(e) => {
                  e.preventDefault();
                  if (parentObj) {
                    if (objItem.name.trim()) {
                      dispatch(
                        fetchAddIngredientFromRecipeToShopList({
                          recipeId: parentObj.id,
                          token,
                          ingredientId: objItem.id,
                        })
                      );
                      dispatch(
                        SnackbarTextValue({
                          text: "The item has been added to the shopping list",
                          withUndo: true,
                        })
                      );
                    } else {
                      setError(`ingredient.${indx}.name`, {
                        type: "required",
                        message: "Ingredient name is required",
                      });
                    }
                  }
                }}
              />
            ) : (
              ""
            )}
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
            } ${mode === "shopList" ? "grid-table__row_new-grid" : ""}`}
            style={{ borderTop: "none" }}
          >
            <div className="grid-table__number cell">
              {ingredientsObj.length + 1}
            </div>
            <div
              className={`grid-table__data-wrapper ${
                mode === "shopList" ? "grid-table__data-wrapper_new-grid" : ""
              }`}
            >
              <div className="grid-table__from grid-table__from_name">
                <CellName
                  name="newIngredient.name"
                  control={control}
                  withBorder
                  autoFocus
                />
              </div>
              <div className="grid-table__from grid-table__from_amount">
                <CellAmount
                  name="newIngredient.amount"
                  control={control}
                  withBorder
                />
              </div>
              <div className="grid-table__from grid-table__from_measure">
                <SelectMeasure
                  control={control}
                  name="newIngredient.measurementUnit"
                  setSelectValueNewItem={(value) =>
                    setSelectValueNewItem(value)
                  }
                  defaultValue=""
                  withBorder
                />
              </div>
            </div>
            <CellAction
              handleSaveClick={handleSubmit(handleSubmitNewItem)}
              handleTrashClick={() => {
                reset();
                setIsActiveAddNewItem(false);
                setIsHoveredByTrashId(null);
                setSelectValueNewItem("select");
              }}
              setIsHoveredByTrashId={(value) => setIsHoveredByTrashId(value)}
              ingredientIndex={ingredientsObj.length}
            />
            {mode === "recipe" ? <div /> : ""}
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
          <span>
            {isScreenSm && mode === "recipe"
              ? "New ingredient"
              : "Add new item"}
          </span>
        </button>
      )}
    </section>
  );
}

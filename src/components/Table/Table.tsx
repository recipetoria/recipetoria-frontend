/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PlusIcon from "../../assets/svg/PlusIcon";
import { Ingredient, TableProps, TableValues } from "../../types/types";
import "./Table.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAddIngredientFromRecipeToShopList,
  fetchDeleteIngredient,
  fetchUpdateIngredient,
  fetchUpdateRecipeInfo,
} from "../../features/OneRecipeSlice";
import CellTrash from "./Cells/CellTrash";
import {
  fetchUpdateIngredientFromShopList,
  fetchCreateNewIngredient,
  fetchDeleteIngredientFromShopList,
} from "../../features/ShoppingListSlice";
import SelectMeasure from "./Cells/SelectMeasure";
import CellName from "./Cells/CellName";
import CellAmount from "./Cells/CellAmount";

export default function Table(props: TableProps) {
  const { mode, ingredientsObj, parentObj } = props;

  const sortedIngredientsObj = [...ingredientsObj].sort((a, b) => {
    if (a.id && b.id) {
      return a.id - b.id;
    }
    return 1;
  });

  const { handleSubmit, reset, control, setValue } = useForm<TableValues>({
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
    }
  };

  const [selectValueNewItem, setSelectValueNewItem] = useState("select");

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
      }
    } else {
      reset();
      setIsActiveAddNewItem(false);
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
          <div className="grid-table__amount cell cell_header">Amount</div>
          <div className="grid-table__measure cell cell_header">Measure</div>
        </div>
        {mode === "recipe" ? (
          <div className="grid-table__action grid-table__action_header cell cell_header">
            Action
          </div>
        ) : (
          ""
        )}
        <div className="grid-table__delete cell cell_header">Delete</div>
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
                  setChangedIngredientData={(value) =>
                    setChangedIngredientData(value)
                  }
                  withBorder={false}
                />
              </form>
            </div>
            {mode === "recipe" ? (
              <button
                type="button"
                className="grid-table__action cell cell_btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (parentObj) {
                    dispatch(
                      fetchAddIngredientFromRecipeToShopList({
                        recipeId: parentObj.id,
                        token,
                        ingredientId: objItem.id,
                      })
                    );
                  }
                }}
              >
                <PlusIcon />
                <span>Add to shop list</span>
              </button>
            ) : (
              ""
            )}
            <CellTrash
              setIsHoveredByTrashId={(value) => setIsHoveredByTrashId(value)}
              ingredientIndex={indx}
              handleClick={() => {
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
              }}
            />
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
            {mode === "recipe" ? <div /> : ""}
            <CellTrash
              setIsHoveredByTrashId={(value) => setIsHoveredByTrashId(value)}
              ingredientIndex={ingredientsObj.length}
              handleClick={() => {
                reset();
                setIsActiveAddNewItem(false);
                setIsHoveredByTrashId(null);
              }}
            />
          </form>
        </>
      ) : (
        <button
          type="button"
          className={`grid-table__new-item-btn ${
            mode === "shopList" ? "grid-table__new-item-btn_shop-list" : ""
          }`}
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

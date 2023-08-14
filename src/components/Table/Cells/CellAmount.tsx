/* eslint-disable react/jsx-props-no-spreading */
import { KeyboardEvent } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { CellAmountProps } from "../../../types/types";
import useResize from "../../../hooks/useResize";

export default function CellAmount(props: CellAmountProps) {
  const { name, control, withBorder, setChangedIngredientData } = props;

  const { isScreenSm } = useResize();

  const inputPropsStyle: React.CSSProperties = withBorder
    ? {
        padding: "8px 0.833vw",
        cursor: "pointer",
        textAlign: "right",
        fontSize: isScreenSm ? "14px" : "16px",
        border: "1px solid #D9D9D9",
        borderRadius: "4px",
      }
    : {
        padding: "8px 0.833vw",
        cursor: "pointer",
        textAlign: "right",
        fontSize: isScreenSm ? "14px" : "16px",
      };

  // TODO: uncomment when it add in server side
  // const regex = /[\d.,\\/-]+/;
  const regex = /[\d.]+/;
  const validateAmountField = (keyEvent: KeyboardEvent<HTMLDivElement>) => {
    if (
      !regex.test(keyEvent.key) &&
      keyEvent.key !== "Backspace" &&
      keyEvent.key !== "ArrowRight" &&
      keyEvent.key !== "ArrowLeft"
    ) {
      keyEvent.preventDefault();
    }

    // TODO: add submit by enter for all fields
    // if (keyEvent.key === "Enter") {
    //   handleSubmitChangeItem(objItem);
    // }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: { value: regex, message: "Invalid amount" },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          multiline
          placeholder="-"
          type="number"
          size="small"
          inputProps={{
            style: inputPropsStyle,
          }}
          onKeyDown={(keyEvent) => validateAmountField(keyEvent)}
          onChange={(e) => {
            if (
              +e.currentTarget.value <= 9999.99 &&
              +e.currentTarget.value.length <= 7
            ) {
              if (setChangedIngredientData) {
                setChangedIngredientData({
                  name: null,
                  amount: +e.currentTarget.value,
                  measure: null,
                });
              }
              field.onChange(e);
            }
          }}
          error={!!error?.message}
          helperText={error?.message}
          value={field.value || ""}
        />
      )}
    />
  );
}

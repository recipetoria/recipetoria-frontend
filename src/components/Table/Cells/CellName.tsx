/* eslint-disable react/jsx-props-no-spreading */
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { CellNameProps } from "../../../types/types";

export default function CellName(props: CellNameProps) {
  const { name, control, withBorder, setChangedIngredientData, autoFocus } =
    props;

  const inputPropsStyle = withBorder
    ? {
        padding: "8px 0.833vw",
        cursor: "pointer",
        border: "1px solid #D9D9D9",
        borderRadius: "4px",
      }
    : {
        padding: "8px 0.833vw",
        cursor: "pointer",
      };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Ingredient name is required",
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          multiline
          placeholder="Type ingredient name..."
          size="small"
          inputProps={{
            style: inputPropsStyle,
            maxLength: 30,
          }}
          onChange={(e) => {
            if (setChangedIngredientData) {
              setChangedIngredientData({
                name: e.currentTarget.value,
                amount: null,
                measure: null,
              });
            }

            field.onChange(e);
          }}
          error={!!error?.message}
          helperText={error?.message}
          value={field.value}
          autoFocus={autoFocus}
        />
      )}
    />
  );
}
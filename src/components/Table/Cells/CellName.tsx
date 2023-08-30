/* eslint-disable react/jsx-props-no-spreading */
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { CellNameProps } from "../../../types/types";
import useResize from "../../../hooks/useResize";

export default function CellName(props: CellNameProps) {
  const { name, control, withBorder, setChangedIngredientData, autoFocus } =
    props;

  const { isScreenSm } = useResize();

  const inputPropsStyle = withBorder
    ? {
        cursor: "pointer",
        borderRadius: "4px",
      }
    : {
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
            style: isScreenSm ? {} : inputPropsStyle,
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
          value={field.value ? field.value.trimStart() : field.value}
          autoFocus={autoFocus}
          fullWidth
        />
      )}
    />
  );
}

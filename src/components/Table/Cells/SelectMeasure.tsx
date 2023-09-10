/* eslint-disable react/jsx-props-no-spreading */
import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import measureValues from "../../../assets/data/measureArray";
import { SelectMeasureProps } from "../../../types/types";
import useResize from "../../../hooks/useResize";

export default function SelectMeasure(props: SelectMeasureProps) {
  const {
    control,
    name,
    defaultValue,
    withBorder,
    setSelectValueNewItem,
    changedIngredientData,
    setChangedIngredientData,
  } = props;

  const [selectValue, setSelectValue] = useState(defaultValue || "select");

  const { isScreenSm } = useResize();

  const sxStyle = withBorder
    ? {
        width: "100%",
        maxWidth: "143px",
        border: "1px solid #D9D9D9",
        borderRadius: "4px",
      }
    : {
        width: "100%",
        maxWidth: "143px",
      };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          select
          size="small"
          fullWidth
          {...field}
          onChange={(e) => {
            setSelectValue(e.target.value);
            setSelectValueNewItem(e.target.value);

            if (setChangedIngredientData) {
              setChangedIngredientData({
                name: changedIngredientData ? changedIngredientData.name : null,
                amount: changedIngredientData
                  ? changedIngredientData.amount
                  : null,
                measure: e.target.value,
              });
            }
          }}
          value={selectValue}
          sx={sxStyle}
          InputProps={{ style: { fontSize: isScreenSm ? "14px" : "16px" } }}
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
  );
}

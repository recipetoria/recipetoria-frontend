/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import useModal from "../../hooks/useModal";
import "./ModalContentTextEdit.scss";
import Trash from "../../assets/svg/Trash";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

interface ModalContentTextEditProps {
  recipeId: number;
  name: string;
}

export default function ModalContentTextEdit(props: ModalContentTextEditProps) {
  const { recipeId, name } = props;

  const { toggle } = useModal();
  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  const dispatch = useAppDispatch();
  const initialInstructionText = useAppSelector(
    (state) => state.present.recipe.value.instructions
  );
  const token = useAppSelector((state) => state.present.authData.value.token);

  const onSubmit = (data: { text: string }) => {
    const { text } = data;

    dispatch(
      fetchUpdateRecipeInfo({
        recipeId,
        token,
        infoRecipeData: {
          name,
          instructions: text || "",
        },
      })
    );
    toggle();
    dispatch(
      SnackbarTextValue({
        text: "Your changes have been successfully saved",
        withUndo: false,
      })
    );
  };

  const maxLength = 2000;

  const { ref, ...inputProps } = register("text");

  const [lengthCount, setLengthCount] = useState(
    initialInstructionText?.length || 0
  );

  return (
    <form className="modal-edit-text" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="modal-edit-text__h3">Edit cooking instruction</h3>
      <section className="edit-block">
        <section className="textarea-n-caption">
          <div className="textarea-n-trash-btn">
            <TextField
              multiline
              placeholder="Type your instruction..."
              minRows={2}
              maxRows={16}
              inputProps={{
                maxLength,
                style: {
                  color: "#2D2B2B",
                  lineHeight: "1.5",
                  letterSpacing: "0.5px",
                  maxHeight: `40vh`,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
              }}
              {...inputProps}
              inputRef={ref}
              onChange={(e) => {
                setLengthCount(e.currentTarget.value.length);
              }}
              fullWidth
              size="small"
              defaultValue={initialInstructionText}
            />
            <button
              type="button"
              className="textarea-n-trash-btn__btn"
              onClick={() => {
                reset();
                setLengthCount(0);
              }}
            >
              <Trash />
            </button>
          </div>
          <span className="textarea-n-caption__caption">
            {lengthCount}/2000
          </span>
        </section>
        <section className="btns">
          <button type="button" className="btns__cancel" onClick={toggle}>
            Cancel
          </button>
          <button type="submit" className="btns__ok">
            Save changes
          </button>
        </section>
      </section>
    </form>
  );
}

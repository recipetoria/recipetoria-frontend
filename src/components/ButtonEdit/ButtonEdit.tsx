import { useContext } from "react";
import PencilIcon from "../../assets/svg/PencilIcon";
import useModal from "../../hooks/useModal";
import "./ButtonEdit.scss";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import { Recipe } from "../../types/types";
import ModalContentTextEdit from "../ModalContentTextEdit/ModalContentTextEdit";

type EditMode = "recipeEditName" | "recipeEditText";

export default function ButtonEdit(props: {
  tipText: "name" | "text";
  editMode: EditMode;
  recipeData: Recipe;
}) {
  const { tipText, editMode, recipeData } = props;

  const { toggle } = useModal();
  const { setModalContent } = useContext(ModalContentContext);

  return (
    <div className="btn-edit">
      <button
        className="btn-edit__btn"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle();
          if (editMode === "recipeEditName") {
            setModalContent(
              <ModalContentWitInput
                label="Rename the recipe"
                placeholder="Enter new recipe name"
                inputName="recipeRename"
                tagId={recipeData.tagDTOs}
                recipeId={recipeData.id}
              />
            );
          } else if (editMode === "recipeEditText") {
            setModalContent(
              <ModalContentTextEdit
                recipeId={recipeData.id}
                name={recipeData.name}
              />
            );
          }
        }}
      >
        <PencilIcon color="#707077" />
        <span>Edit</span>
      </button>
      <span className="btn-edit__tip">Edit {tipText}</span>
    </div>
  );
}

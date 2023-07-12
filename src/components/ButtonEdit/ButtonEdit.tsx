import PencilIcon from "../../assets/svg/PencilIcon";
import "./ButtonEdit.scss";

type EditMode = "recipeEditName" | "recipeEditText";

export default function ButtonEdit(props: {
  tipText: "name" | "text";
  editMode: EditMode;
}) {
  const { tipText, editMode } = props;

  return (
    <div className="btn-edit">
      <button className="btn-edit__btn" type="button">
        <PencilIcon color="#707077" />
        <span>Edit</span>
      </button>
      <span className="btn-edit__tip">Edit {tipText}</span>
    </div>
  );
}

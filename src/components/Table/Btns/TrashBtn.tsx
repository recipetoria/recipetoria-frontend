import Trash from "../../../assets/svg/Trash";

interface TrashBtnProps {
  setIsHoveredByTrashId: (value: number | null) => void;
  ingredientIndex: number;
  handleClick: () => void;
}

export default function TrashBtn(props: TrashBtnProps) {
  const { setIsHoveredByTrashId, ingredientIndex, handleClick } = props;

  return (
    <div className="grid-table__from grid-table__from_delete">
      <button
        type="button"
        className="grid-table__delete cell cell_btn"
        onMouseEnter={() => {
          setIsHoveredByTrashId(ingredientIndex);
        }}
        onMouseLeave={() => {
          setIsHoveredByTrashId(null);
        }}
        onClick={handleClick}
      >
        <Trash />
      </button>
      <span className="caption">Delete</span>
    </div>
  );
}

import SaveBtn from "../Btns/SaveBtn";
import TrashBtn from "../Btns/TrashBtn";

interface CellActionProps {
  handleSaveClick: () => void;
  handleTrashClick: () => void;
  setIsHoveredByTrashId: (value: number | null) => void;
  ingredientIndex: number;
}

export default function CellAction(props: CellActionProps) {
  const {
    handleSaveClick,
    handleTrashClick,
    setIsHoveredByTrashId,
    ingredientIndex,
  } = props;

  return (
    <section className="action-cell">
      <SaveBtn handleClick={handleSaveClick} />
      <TrashBtn
        setIsHoveredByTrashId={(value) => setIsHoveredByTrashId(value)}
        ingredientIndex={ingredientIndex}
        handleClick={handleTrashClick}
      />
    </section>
  );
}

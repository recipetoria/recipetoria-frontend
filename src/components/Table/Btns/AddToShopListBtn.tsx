interface AddToShopListBtnProps {
  handleClick: (event: React.MouseEvent) => void;
}

export default function AddToShopListBtn(props: AddToShopListBtnProps) {
  const { handleClick } = props;

  return (
    <button
      type="button"
      className="grid-table__action cell cell_btn"
      onClick={(e) => handleClick(e)}
    >
      <span>
        Add <b className="small-size-text-in-action">item</b> to shopping list
      </span>
    </button>
  );
}

import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Print from "../../assets/svg/Print";
import Button from "../Button/Button";
import Share from "../../assets/svg/Share";
import Trash from "../../assets/svg/Trash";
import ShoppingListTable from "../ShoppingListTable/ShoppingListTable";
import Modal from "../Modal/Modal";
import Snackbar from "../Snackbar/Snackbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useModal from "../../hooks/useModal";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import { fetchCleanShoppingList } from "../../features/ShoppingListSlice";

export default function ShoppingListPageContent() {
  const componentRef = useRef(null);
  const dispatch = useAppDispatch();
  const { toggle } = useModal();

  const token = useAppSelector((state) => state.present.authData.value.token);
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const shoppingListValues = useAppSelector(
    (state) => state.present.shoppingList.value
  );

  const { modalContent } = useContext(ModalContentContext);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
  });

  return (
    <article className="shopping-list-page">
      <section className="img-block" />
      <section className="shopping-list-block">
        <div className="shopping-list-block__wrapper">
          <article className="shopping-list-block__header">
            <h2 className="shopping-list-block__h2">Shopping list</h2>
            <section className="shopping-list-block__btns">
              <Button icon={<Print />} onClick={handlePrint} />
              <Button icon={<Share />} onClick={() => {}} />
              <Button
                icon={<Trash />}
                onClick={() => {
                  dispatch(fetchCleanShoppingList({ token }));
                }}
              />
            </section>
          </article>
          <article className="shopping-list-block__table" ref={componentRef}>
            <ShoppingListTable shopListArr={shoppingListValues} />
          </article>
        </div>
      </section>
      <Modal isOpen={isOpen} toggle={toggle}>
        {modalContent}
      </Modal>
      <Snackbar />
    </article>
  );
}

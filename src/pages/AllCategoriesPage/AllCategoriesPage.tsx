import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AllCategoriesPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CategoriesCards from "../../components/CategoriesCards/CategoriesCards";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import Snackbar from "../../components/Snackbar/Snackbar";
import { fetchTags } from "../../features/CategorySlice";

export default function AllCategoriesPage() {
  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { toggle } = useModal();
  const [modalChildren, setModalChildren] = useState<ReactNode>(<div />);
  const token = useAppSelector((state) => state.present.authData.value.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
    dispatch(fetchTags(token));
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="categories-page">
              <div className="categories-page__wrapper">
                <h2 className="categories-page__h2">Categories</h2>
                <CategoriesCards
                  toggle={toggle}
                  modalChildren={(modalChild) => setModalChildren(modalChild)}
                />
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                {modalChildren}
              </Modal>
              <Snackbar />
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

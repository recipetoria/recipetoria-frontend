import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AllCategoriesPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import Snackbar from "../../components/Snackbar/Snackbar";
import { fetchTags } from "../../features/CategorySlice";
import { ModalContentContext } from "../../contexts/ModalContentContext";

export default function AllCategoriesPage() {
  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { toggle } = useModal();
  const token = useAppSelector((state) => state.present.authData.value.token);
  const { modalContent } = useContext(ModalContentContext);

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
                <Outlet />
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                {modalContent}
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

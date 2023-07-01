import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { isAuthValue } from "../../features/AuthSlice";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./StartPage.scss";
import StartPageTopPart from "../../components/StartPageTopPart/StartPageTopPart";
import StartPageBottomPart from "../../components/StartPageBottomPart/StartPageBottomPart";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import {
  isOpenModalMode,
  isOpenModalValue,
} from "../../features/IsOpenModalSlice";

export default function StartPage() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { toggle } = useModal();

  const { modalContent, setModalContent } = useContext(ModalContentContext);

  setTimeout(() => {
    setModalContent(null);
    dispatch(isOpenModalValue(false));
    dispatch(isOpenModalMode("none"));
  }, 2000);

  useEffect(() => {
    dispatch(
      isAuthValue({
        name: localStorage.getItem("authRegister")
          ? JSON.parse(localStorage.getItem("authRegister") || "").name
          : "",
        token: localStorage.getItem("authRegister")
          ? JSON.parse(localStorage.getItem("authRegister") || "").token
          : "",
        isAuth: localStorage.getItem("authRegister")
          ? !!JSON.parse(localStorage.getItem("authRegister") || "").isAuth
          : false,
      })
    );
  });

  return (
    <>
      <Header />
      <main>
        <article className="start-page">
          <div className="start-page__wrapper">
            <StartPageTopPart />
            <section className="start-page__banner-wrapper">
              <div className="start-page__banner" />
            </section>
            <StartPageBottomPart />
          </div>
          <Modal isOpen={isOpen} toggle={toggle}>
            {modalContent}
          </Modal>
          <Snackbar />
        </article>
      </main>
      <Footer />
    </>
  );
}

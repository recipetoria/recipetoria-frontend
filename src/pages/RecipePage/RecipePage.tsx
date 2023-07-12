import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import Snackbar from "../../components/Snackbar/Snackbar";
import Footer from "../../components/Footer/Footer";
import "./RecipePage.scss";
import PencilIcon from "../../assets/svg/PencilIcon";

export default function RecipePage() {
  const { recipeName, recipeId } = useParams();

  const navigate = useNavigate();
  const { toggle } = useModal();

  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { modalContent } = useContext(ModalContentContext);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="recipe-page">
              <div className="recipe-page__wrapper">
                <div className="recipe-page-header">
                  <h2 className="recipe-page-header__text">{recipeName}</h2>
                  <button className="recipe-page__btn" type="button">
                    <PencilIcon color="#707077" />
                    <span>Edit</span>
                  </button>
                </div>
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

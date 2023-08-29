import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ProfilePage.scss";
import ProfileGeneral from "../../components/ProfileGeneral/ProfileGeneral";
import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ModalContentInProfile from "../../components/ModalContentInProfile/ModalContentInProfile";
import DeleteAccountImg from "../../assets/png/delete_account.png";
import deleteAccount from "../../API/deleteAccount";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import LogOutBtn from "./Btns/LogOutBtn";
import useResize from "../../hooks/useResize";
import getUserInfo from "../../API/getUserInfo";
import { fetchTags } from "../../features/CategorySlice";

type ProfileStates = "general" | "changePassword";

export default function ProfilePage() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const token = useAppSelector((state) => state.present.authData.value.token);
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [profileState, SetProfileState] = useState<ProfileStates>("general");
  const { toggle } = useModal();
  const { isScreenSm, isScreenMd } = useResize();

  useEffect(() => {
    if (isAuth !== true && location.pathname !== "sign_in") {
      navigate("/*");
    } else if (token !== "") {
      getUserInfo(token)
        .then(() => {
          dispatch(fetchTags(token));
        })
        .catch(() => {
          navigate("/sign_in");
        });
    }
  });

  function changeProfileState(state: ProfileStates) {
    SetProfileState(state);
  }

  const { modalContent, setModalContent } = useContext(ModalContentContext);

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="profile-page">
              <div className="profile-page__wrapper">
                <h3 className="profile-page__h3">Profile</h3>
                <section className="profile-menu">
                  <div className="profile-menu__wrapper">
                    <div className="profile-menu__btns">
                      <button
                        type="button"
                        className={`profile-menu__btn ${
                          profileState === "general" &&
                          "profile-menu__btn_active"
                        }`}
                        onClick={() => changeProfileState("general")}
                      >
                        General
                      </button>
                      <button
                        type="button"
                        className={`profile-menu__btn ${
                          profileState === "changePassword" &&
                          "profile-menu__btn_active"
                        }`}
                        onClick={() => changeProfileState("changePassword")}
                      >
                        Change password
                      </button>
                      {isScreenSm || isScreenMd ? "" : <LogOutBtn />}
                    </div>
                    <div className="profile-menu__delete-btn-wrapper">
                      {isScreenSm || isScreenMd ? <LogOutBtn /> : ""}
                      <button
                        type="button"
                        className="profile-menu__btn"
                        onClick={() => {
                          toggle();
                          setModalContent(
                            <ModalContentInProfile
                              imageSrc={DeleteAccountImg}
                              text="Are you sure you want to delete your account?"
                              handleClickByOkBtn={() => {
                                deleteAccount(token).then(() => {
                                  toggle();
                                  navigate("/");
                                  dispatch(
                                    SnackbarTextValue({
                                      text: "Your account was deleted",
                                      withUndo: false,
                                    })
                                  );
                                });
                              }}
                              submitBtn={{
                                text: "Ok",
                                style: "btn",
                              }}
                              cancelBtnStyle="borderNone"
                            />
                          );
                        }}
                      >
                        Delete account
                      </button>
                    </div>
                  </div>
                </section>
                <section className="profile-data">
                  <h3 className="profile-data__h3">Profile</h3>
                  {profileState === "general" && (
                    <ProfileGeneral
                      toggle={toggle}
                      modalChildren={(modalChild) =>
                        setModalContent(modalChild)
                      }
                    />
                  )}
                  {profileState === "changePassword" && (
                    <ProfileChangePassword />
                  )}
                </section>
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                {modalContent}
              </Modal>
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

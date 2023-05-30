import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ProfilePage.scss";
import ProfileGeneral from "../../components/ProfileGeneral/ProfileGeneral";
import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";

type ProfileStates = "general" | "changePassword";

export default function ProfilePage() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const navigate = useNavigate();
  const [profileState, SetProfileState] = useState<ProfileStates>("general");
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
  });

  function changeProfileState(state: ProfileStates) {
    SetProfileState(state);
  }

  const [modalChildren, setModalChildren] = useState<ReactNode>(<div />);

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="profile-page">
              <div className="profile-page__wrapper">
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
                      <button type="button" className="profile-menu__btn">
                        Log Out
                      </button>
                    </div>
                    <button type="button" className="profile-menu__btn">
                      Delete account
                    </button>
                  </div>
                </section>
                <section className="profile-data">
                  <h3 className="profile-data__h3">Profile</h3>
                  {profileState === "general" && (
                    <ProfileGeneral
                      toggle={toggle}
                      modalChildren={(modalChild) =>
                        setModalChildren(modalChild)
                      }
                    />
                  )}
                  {profileState === "changePassword" && (
                    <ProfileChangePassword />
                  )}
                </section>
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                {modalChildren}
              </Modal>
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ProfilePage.scss";
import ProfileGeneral from "../../components/ProfileGeneral/ProfileGeneral";

export default function ProfilePage() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const navigate = useNavigate();

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
            <article className="profile-page">
              <div className="profile-page__wrapper">
                <section className="profile-menu">
                  <div className="profile-menu__btns">
                    <button type="button" className="profile-menu__btn">
                      General
                    </button>
                    <button type="button" className="profile-menu__btn">
                      Change password
                    </button>
                    <button type="button" className="profile-menu__btn">
                      Log Out
                    </button>
                  </div>
                  <button type="button" className="profile-menu__btn">
                    Delete account
                  </button>
                </section>
                <section className="profile-data">
                  <h3>Profile</h3>
                  <ProfileGeneral />
                </section>
              </div>
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

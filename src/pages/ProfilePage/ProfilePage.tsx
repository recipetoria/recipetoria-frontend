import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ProfilePage.scss";

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
            <article className="profile-page">Profile page</article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

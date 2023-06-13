import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { isAuthValue } from "../../features/AuthSlice";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./StartPage.scss";
import StartPageTopPart from "../../components/StartPageTopPart/StartPageTopPart";

export default function StartPage() {
  const dispatch = useAppDispatch();

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
          </div>
          <Snackbar />
        </article>
      </main>
      <Footer />
    </>
  );
}

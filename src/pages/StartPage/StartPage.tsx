import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { isAuthValue } from "../../features/AuthSlice";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./StartPage.scss";

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
          <h3>Start page</h3>
          <Snackbar />
        </article>
      </main>
      <Footer />
    </>
  );
}

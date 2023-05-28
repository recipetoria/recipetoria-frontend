import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { isAuthValue } from "../../features/AuthSlice";

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
      <h3>Start page</h3>
      <Footer />
    </>
  );
}

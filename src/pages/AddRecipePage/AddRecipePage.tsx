import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddRecipePage.scss";
import { useAppSelector } from "../../app/hooks";

export default function AddRecipePage() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
  });

  return (
    <>
      <Header />
      <main>Add Recipe</main>
      <Footer />
    </>
  );
}

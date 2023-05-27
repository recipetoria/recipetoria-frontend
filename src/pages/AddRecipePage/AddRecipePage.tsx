import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddRecipePage.scss";
import { STORAGE_AUTH } from "../../utils/constants";

export default function AddRecipePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = STORAGE_AUTH ? JSON.parse(STORAGE_AUTH).isAuth : "";
    if (isAuth === false) {
      navigate("*");
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

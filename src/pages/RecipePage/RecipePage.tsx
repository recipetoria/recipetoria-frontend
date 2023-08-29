import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/Header/Header";
import { fetchRecipeByRecipeId } from "../../features/OneRecipeSlice";
import Footer from "../../components/Footer/Footer";
import RecipePageContent from "../../components/RecipePageContent/RecipePageContent";
import { fetchTags } from "../../features/CategorySlice";
import getUserInfo from "../../API/getUserInfo";

export default function RecipePage() {
  const { recipeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );
  const token = useAppSelector((state) => state.present.authData.value.token);

  useEffect(() => {
    if (isAuth !== true && location.pathname !== "sign_in") {
      navigate("/*");
    } else if (token !== "") {
      getUserInfo(token)
        .then(() => {
          dispatch(fetchTags(token));
          if (recipeId) {
            dispatch(fetchRecipeByRecipeId({ token, recipeId: +recipeId }));
          } else {
            throw new Error(`Something went wrong with recipe id: ${recipeId}`);
          }
        })
        .catch(() => {
          navigate("/sign_in");
        });
    }
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="recipe-page">
              <RecipePageContent />
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/Header/Header";
import { fetchRecipeByRecipeId } from "../../features/OneRecipeSlice";
import Footer from "../../components/Footer/Footer";
import RecipePageContent from "../../components/RecipePageContent/RecipePageContent";

export default function RecipePage() {
  const { recipeName, recipeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );
  const token = useAppSelector((state) => state.present.authData.value.token);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
    if (recipeId) {
      dispatch(fetchRecipeByRecipeId({ token, recipeId: +recipeId }));
    } else {
      throw new Error(`Something went wrong with recipe id: ${recipeId}`);
    }
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="recipe-page">
              <RecipePageContent recipeName={recipeName || ""} />
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

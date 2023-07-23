/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./RecipeLinks.scss";
import { TextField } from "@mui/material";
import LinksImage from "../../assets/png/links_image.png";
import { Recipe } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import Trash from "../../assets/svg/Trash";

interface RecipeLinksFormValues {
  addLink: string;
}

export default function RecipeLinks(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RecipeLinksFormValues>();
  const dispatch = useAppDispatch();

  const [linkValue, setLinkValue] = useState("");
  const [isHoveredByTrashId, setIsHoveredByTrashId] = useState<number | null>(
    null
  );
  const token = useAppSelector((state) => state.present.authData.value.token);

  const handleSubmitNewLink = () => {
    const isValid =
      linkValue.includes("http://") || linkValue.includes("https://");
    if (isValid) {
      dispatch(
        fetchUpdateRecipeInfo({
          recipeId: recipeData.id,
          token,
          infoRecipeData: {
            name: recipeData.name,
            links:
              recipeData.links !== null
                ? [...recipeData.links, linkValue]
                : [linkValue],
          },
        })
      );
    } else {
      setError("addLink", {
        message: "The link should start with 'http://' or 'https://'",
      });
    }
  };

  return (
    <article className="recipe-links">
      <div className="recipe-links__wrapper">
        <section className="links-block">
          <h3 className="links-block__h3">Links to external sources</h3>
          <div className="links-block__links">
            <section className="table-links">
              {(recipeData.links || []).length > 0 && recipeData.links !== null
                ? recipeData.links.map((link, indx) => {
                    return (
                      <div
                        className={`table-links__row ${
                          isHoveredByTrashId === indx
                            ? "table-links__row_hover-by-trash"
                            : ""
                        }`}
                        key={`row-${link}-${recipeData.id}`}
                      >
                        <section className="table-links__number-n-link">
                          <div className="table-links__cell table-links__cell_number">
                            {indx + 1}
                          </div>
                          <a
                            href={link}
                            className="table-links__cell table-links__cell_link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link}
                          </a>
                        </section>
                        <form className="table-links__form table-links__form_delete">
                          <button
                            type="button"
                            className="table-links__delete cell cell_btn"
                            onMouseEnter={() => {
                              setIsHoveredByTrashId(indx);
                            }}
                            onMouseLeave={() => {
                              setIsHoveredByTrashId(null);
                            }}
                          >
                            <Trash />
                          </button>
                          <span className="caption">Delete</span>
                        </form>
                      </div>
                    );
                  })
                : ""}
            </section>
          </div>
          <div className="links-block__add-link">
            <h4 className="links-block__h4">Add link</h4>
            <form
              onSubmit={handleSubmit(handleSubmitNewLink)}
              onBlur={handleSubmit(handleSubmitNewLink)}
            >
              <Controller
                name="addLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.addLink?.message}
                    id="outlined-error-helper-text"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #707077",
                        borderRadius: "4px",
                      },
                    }}
                    placeholder="Enter your link here"
                    fullWidth
                    helperText={
                      "The link should start with 'http://' or 'https://'"
                    }
                    value={linkValue}
                    onChange={(e) => setLinkValue(e.target.value)}
                  />
                )}
              />
            </form>
          </div>
        </section>
        <div className="recipe-links__image-wrapper">
          <img src={LinksImage} alt="links" className="recipe-links__image" />
        </div>
      </div>
    </article>
  );
}

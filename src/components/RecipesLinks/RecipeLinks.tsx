/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./RecipeLinks.scss";
import { TextField } from "@mui/material";
import { Recipe } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import RecipeLinksTable from "./RecipeLinksTable";
import LinkImageBlock from "./Images/LinksImageBlock";
import useResize from "../../hooks/useResize";

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
  } = useForm<RecipeLinksFormValues>({ mode: "all" });
  const dispatch = useAppDispatch();
  const { isScreenXl } = useResize();

  const [linkValue, setLinkValue] = useState("");
  const token = useAppSelector((state) => state.present.authData.value.token);

  const handleSubmitNewLink = () => {
    if (linkValue) {
      const isValid =
        (linkValue.includes("http://") || linkValue.includes("https://")) &&
        (linkValue.startsWith("http://") || linkValue.startsWith("https://"));
      if (isValid) {
        const isExist = recipeData.links?.includes(linkValue);
        if (!isExist) {
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
          setLinkValue("");
        } else {
          setError("addLink", {
            message: "This link is already exist",
          });
        }
      } else {
        setError("addLink", {
          message: "The link should start with 'http://' or 'https://'",
        });
      }
    }
  };

  return (
    <article className="recipe-links">
      <div className="recipe-links__wrapper">
        <section className="links-block">
          <div className="links-block__header-wrapper">
            {isScreenXl ? <LinkImageBlock /> : ""}
            <h3 className="links-block__h3">Links to External Sources</h3>
          </div>
          <div className="links-block__links">
            {(recipeData.links || []).length && recipeData.links ? (
              <div className="links-block__table-block">
                <span className="links-block__table-header">Delete</span>
                <RecipeLinksTable
                  links={recipeData.links}
                  recipeId={recipeData.id}
                  recipeName={recipeData.name}
                />
              </div>
            ) : (
              <span className="links-block__text">
                There are no links here yet. You can add your favorite links
                here!
              </span>
            )}
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
                      errors.addLink?.message ||
                      "The link should start with 'http://' or 'https://'"
                    }
                    value={linkValue}
                    onChange={(e) => {
                      field.onChange(e);
                      setLinkValue(e.target.value.replaceAll(" ", ""));
                    }}
                    onKeyDown={(keyEvent) => {
                      if (keyEvent.key === " ") {
                        keyEvent.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </form>
          </div>
        </section>
        {isScreenXl ? "" : <LinkImageBlock />}
      </div>
    </article>
  );
}

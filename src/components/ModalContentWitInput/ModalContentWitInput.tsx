import { SubmitHandler, useForm } from "react-hook-form";
import CrossIcon from "../../assets/svg/CrossIcon";
import useModal from "../../hooks/useModal";
import Input from "../Input/Input";
import { FormValues, IModalContentWitInput } from "../../types/types";
import "./ModalContentWitInput.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import {
  fetchCreateNewTag,
  fetchUpdateTagName,
} from "../../features/CategorySlice";
import { fetchCreateNewRecipe } from "../../features/RecipesSlice";

export default function ModalContentWitInput(props: IModalContentWitInput) {
  const { label, placeholder, inputName, tagId } = props;

  const { toggle } = useModal();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.present.authData.value.token);
  const tags = useAppSelector((state) => state.present.tags.value);
  const recipes = useAppSelector((state) => state.present.recipes.value);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { categoryName, categoryRename, recipeName } = data;
    let objForSnackbar = {
      text: "",
      withUndo: false,
    };

    function successCreate() {
      dispatch(SnackbarTextValue(objForSnackbar));
      reset();
      toggle();
    }

    const isFoundInTagsArr = (name: string) =>
      tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());

    const isFoundInRecipesArr = (name: string) =>
      recipes.find(
        (recipe) => recipe.name.toLowerCase() === name.toLowerCase()
      );

    const notFoundIdError = (id: number | undefined) => {
      throw new Error(`Not found tag id: ${id}`);
    };

    if (categoryName) {
      if (!isFoundInTagsArr(categoryName)) {
        dispatch(
          fetchCreateNewTag({
            token,
            data: {
              name: categoryName,
              id: 0,
              mainPhoto: null,
              applicationUserId: 0,
              recipeIds: [],
            },
          })
        );
        objForSnackbar = {
          text: "New category was created",
          withUndo: false,
        };
        successCreate();
      } else {
        setError("categoryName", {
          message: "This category is already exist",
        });
      }
    } else if (categoryRename) {
      if (tagId) {
        if (!isFoundInTagsArr(categoryRename)) {
          dispatch(
            fetchUpdateTagName({
              token,
              data: {
                id: 0,
                name: categoryRename,
                mainPhoto: null,
                applicationUserId: 0,
                recipeIds: [],
              },
              tagId,
            })
          );
          objForSnackbar = {
            text: "The category was renamed",
            withUndo: true,
          };
          successCreate();
        } else {
          setError("categoryRename", {
            message: "This category is already exist",
          });
        }
      } else {
        notFoundIdError(tagId);
      }
    } else if (recipeName) {
      if (tagId) {
        if (!isFoundInRecipesArr(recipeName)) {
          dispatch(
            fetchCreateNewRecipe({
              name: recipeName,
              tagId,
              token,
            })
          );
          objForSnackbar = {
            text: "New recipe was created",
            withUndo: false,
          };
          successCreate();
        } else {
          setError("recipeName", {
            message: "This recipe is already exist",
          });
        }
      } else {
        notFoundIdError(tagId);
      }
    }
  };

  return (
    <section className="create-new-category">
      <button
        type="button"
        className="create-new-category__cross-wrapper"
        onClick={toggle}
      >
        <CrossIcon color="#707077" />
      </button>
      <form className="create-block-n-btns" onSubmit={handleSubmit(onSubmit)}>
        <section className="create-block">
          <h3 className="create-block__h3">{label}</h3>
          <Input
            name={inputName}
            label=""
            register={register}
            errors={errors}
            required
            type="text"
            placeholder={placeholder}
            caption="Max 30 symbols"
            validationSchema={{
              required: "Category name is required",
              minLength: {
                value: 3,
                message: "Please enter a minimum of 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Please enter a maximum of 30 characters",
              },
            }}
          />
        </section>
        <section className="btns">
          <button type="button" className="btns__cancel" onClick={toggle}>
            Cancel
          </button>
          <button type="submit" className="btns__ok">
            Ok
          </button>
        </section>
      </form>
    </section>
  );
}

import { SubmitHandler, useForm } from "react-hook-form";
import CrossIcon from "../../assets/svg/CrossIcon";
import useModal from "../../hooks/useModal";
import Input from "../Input/Input";
import { FormValues } from "../../types/types";
import "./CreateNewCategory.scss";
import { useAppDispatch } from "../../app/hooks";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

export default function CreateNewCategory() {
  const { toggle } = useModal();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { categoryName } = data;
    dispatch(
      SnackbarTextValue({
        text: "New category was created",
        withUndo: false,
      })
    );
    reset();
    toggle();
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
          <h3 className="create-block__h3">Create new category</h3>
          <Input
            name="categoryName"
            label=""
            register={register}
            errors={errors}
            required
            type="text"
            placeholder="Enter the new category name"
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

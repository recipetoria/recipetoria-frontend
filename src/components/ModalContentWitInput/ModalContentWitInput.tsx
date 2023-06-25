import { SubmitHandler, useForm } from "react-hook-form";
import CrossIcon from "../../assets/svg/CrossIcon";
import useModal from "../../hooks/useModal";
import Input from "../Input/Input";
import { FormValues, InputNames } from "../../types/types";
import "./ModalContentWitInput.scss";
import { useAppDispatch } from "../../app/hooks";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

interface IModalContentWitInput {
  label: string;
  placeholder: string;
  inputName: InputNames;
}

export default function ModalContentWitInput(props: IModalContentWitInput) {
  const { label, placeholder, inputName } = props;

  const { toggle } = useModal();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { categoryName, categoryRename } = data;
    let objForSnackbar = {
      text: "",
      withUndo: false,
    };

    if (categoryName) {
      objForSnackbar = {
        text: "New category was created",
        withUndo: false,
      };
    } else if (categoryRename) {
      objForSnackbar = {
        text: "The category was renamed",
        withUndo: true,
      };
    }

    dispatch(SnackbarTextValue(objForSnackbar));
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

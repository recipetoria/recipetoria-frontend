/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "../../types/types";
import "./Input.scss";
import EyeIcon from "../../assets/svg/EyeIcon";

interface InputProps {
  name: "nickname" | "email" | "password" | "checkbox";
  label: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  required: boolean;
  type: string;
  validationSchema?: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  placeholder: string;
}

export default function Input(props: InputProps) {
  const {
    name,
    label,
    register,
    errors,
    required,
    type,
    validationSchema,
    placeholder,
  } = props;

  return (
    <div className="form-control-input">
      <label htmlFor={name} className="form-control-input__label">
        {label}
      </label>
      <div className="input__wrapper">
        <input
          type={type}
          id={name}
          required={required}
          placeholder={placeholder}
          {...register(name, validationSchema)}
          className="input"
        />
        {name === "password" ? (
          <button type="button" onClick={() => {}}>
            <EyeIcon />
          </button>
        ) : (
          ""
        )}
      </div>
      {errors && errors[name]?.type === "required" && (
        <span className="error">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "minLength" && (
        <span className="error">{errors[name]?.message}</span>
      )}
    </div>
  );
}

/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "../../types/types";
import "./Input.scss";
import EyeIcon from "../../assets/svg/EyeIcon";

interface InputProps {
  name: "nickname" | "email" | "password" | "checkbox" | "repeatPassword";
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
  caption?: string;
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
    caption,
  } = props;

  const captionText = () => {
    let text: string | undefined;
    if (errors[name]?.message) {
      text = errors[name]?.message;
    } else if (caption) {
      text = caption;
    }
    return text;
  };

  return (
    <div
      className={`form-control-input ${
        type === "checkbox" ? "form-control-input_checkbox" : ""
      }`}
    >
      <label
        htmlFor={name}
        className={`form-control-input__label ${
          type === "checkbox" ? "form-control-input__label_checkbox" : ""
        }`}
      >
        {label}
      </label>
      <div
        className={`input__wrapper ${
          errors[name]?.message ? "input__wrapper_error" : ""
        } ${type === "checkbox" ? "input__wrapper_checkbox" : ""}`}
      >
        <input
          type={type}
          id={name}
          required={required}
          placeholder={placeholder}
          {...register(name, validationSchema)}
          className={`input ${type === "checkbox" ? "input_checkbox" : ""}`}
        />
        {name === "password" ? (
          <button type="button" onClick={() => {}} className="input__btn">
            <EyeIcon />
          </button>
        ) : (
          ""
        )}
      </div>
      {caption || errors[name]?.message ? (
        <span
          className={`caption ${errors[name]?.message ? "caption_error" : ""}`}
        >
          {captionText()}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";
import { FormValues } from "../../types/types";
import "./Input.scss";
import EyeIcon from "../../assets/svg/EyeIcon";

interface InputProps {
  name:
    | "nickname"
    | "email"
    | "password"
    | "checkbox"
    | "repeatPassword"
    | "oldPassword";
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
  updateData?: (value: string) => void;
  passwordValue?: string;
  updateCustomError?: (value: boolean) => void;
  defaultValue?: string;
}

interface ICustomError {
  errorMessage: string;
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
    updateData,
    passwordValue,
    updateCustomError,
    defaultValue,
  } = props;

  const [isShowedPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState<ICustomError>();

  const captionText = () => {
    let text: string | undefined;
    if (customError?.errorMessage && customError.errorMessage.length > 0) {
      text = customError?.errorMessage;
    } else if (errors[name]?.message) {
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
          type={isShowedPassword ? "text" : type}
          id={name}
          required={required}
          placeholder={placeholder}
          {...register(name, validationSchema)}
          className={`input ${type === "checkbox" ? "input_checkbox" : ""}`}
          onInput={(e) => {
            if (updateData) {
              updateData(e.currentTarget.value);
            }
            if (passwordValue) {
              if (passwordValue !== e.currentTarget.value) {
                setCustomError({ errorMessage: "Password should be equal" });
                if (updateCustomError) updateCustomError(true);
              } else {
                setCustomError({ errorMessage: "" });
                if (updateCustomError) updateCustomError(false);
              }
            }
          }}
          defaultValue={defaultValue}
        />
        {name === "password" ||
        name === "repeatPassword" ||
        name === "oldPassword" ? (
          <button
            type="button"
            onClick={() => setShowPassword(!isShowedPassword)}
            className="input__btn"
          >
            <EyeIcon />
          </button>
        ) : (
          ""
        )}
      </div>
      {caption ||
      (customError && customError?.errorMessage.length > 0) ||
      errors[name]?.message ? (
        <span
          className={`caption ${
            customError || errors[name]?.message ? "caption_error" : ""
          }`}
        >
          {captionText()}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

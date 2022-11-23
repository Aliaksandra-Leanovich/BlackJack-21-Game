import { ChangeEvent, InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface IFormValues {
  email: string;
  password?: string;
  errors?: string;
}

export interface IRegister extends FieldValues, IFormValues {}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<IFormValues>;
  register: UseFormRegister<IRegister>;
  errors?: FieldError | undefined;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

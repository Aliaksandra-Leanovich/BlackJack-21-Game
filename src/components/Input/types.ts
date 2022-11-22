import { ChangeEvent, InputHTMLAttributes } from "react";
import { FieldError, FieldValues } from "react-hook-form";
import { Path, UseFormRegister } from "react-hook-form";

interface IFormValues {
  email?: string;
  password?: string;
  name?: string;
  errors?: string;
  bet?: string;
}

interface IRegister extends FieldValues, IFormValues {}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<IFormValues>;
  register: UseFormRegister<IRegister>;
  errors?: FieldError | undefined;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

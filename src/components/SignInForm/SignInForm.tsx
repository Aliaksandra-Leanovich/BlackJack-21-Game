import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks";
import { setUserEmail } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";
import { IRegister } from "../Input/types";
import styles from "./SignInForm.module.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    const { email } = getValues();
    localStorage.setItem("user", email);
    dispatch(setUserEmail(email));

    if (localStorage.getItem("user")) {
      navigate(routes.HOME);
    }
  };

  return (
    <div className={styles.signIn}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="email"
          label="email"
          errors={errors.email}
          required
          register={register}
          placeholder="Enter your email"
        />
        <Input
          type="password"
          label="password"
          errors={errors.password}
          required
          register={register}
          placeholder="Enter your password"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};

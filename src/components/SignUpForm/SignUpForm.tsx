import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks";
import { setUserEmail, setUserPassword } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "../Input/types";
import styles from "./SignUpForm.module.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const SignUpForm = () => {
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
    const { email, password } = getValues();
    dispatch(setUserEmail(email));
    dispatch(setUserPassword(password));
    localStorage.setItem("user", email);
    navigate(routes.HOME);
  };

  return (
    <div className={styles.sign_up}>
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
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;

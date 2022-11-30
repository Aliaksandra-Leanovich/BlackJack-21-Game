import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks";
import { setUserEmail, setUserPassword } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";
import { IRegister } from "../Input/types";
import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit = () => {
    const data = getValues();
    dispatch(setUserEmail(data.email));
    dispatch(setUserPassword(data.password));
    localStorage.setItem("user", data.email);
    navigate(routes.HOME);
  };

  return (
    <div className={styles.sign_up}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.sign_up__form}>
        <Input
          type="email"
          label="email"
          errors={errors.email}
          register={register}
          placeholder="Enter your email"
        />
        <Input
          type="password"
          label="password"
          errors={errors.password}
          register={register}
          placeholder="Enter your password"
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;

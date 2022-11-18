import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks/hooks";
import { setUserEmail, setUserName } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";
import { IFormInput } from "./types";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = () => {
    const data = getValues();
    dispatch(setUserEmail(data.email));
    dispatch(setUserName(data.name));
    // dispatch(setUserPassword(data.password));
    navigate(routes.HOME);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="name"
          errors={errors.name}
          register={register}
          placeholder="Enter your name"
        />
        <Input
          type="email"
          label="email"
          errors={errors.email}
          register={register}
          placeholder="Enter your email"
        />
        {/* <Input
          type="password"
          label="password"
          errors={errors.password}
          register={register}
          placeholder="Enter your password"
        /> */}
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};
export default SignUpForm;

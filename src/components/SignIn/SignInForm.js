import { useContext, useState } from "react";
import { FirebaseContext } from "../../context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    const { email, password } = data;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        reset();
        console.log("Success");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="text"
        placeholder="Email Address"
        {...register("email")}
      />
      <p>{errors.email?.message}</p>

      <input
        name="password"
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <p>{errors.password?.message}</p>

      <button type="submit">Sign In</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignInForm;

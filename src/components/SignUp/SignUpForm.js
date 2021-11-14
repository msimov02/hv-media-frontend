import { useContext, useState } from "react";
import { FirebaseContext } from "../../context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignUpForm = () => {
  const firebase = useContext(FirebaseContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    const { username, email, password } = data;

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
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
        name="username"
        type="text"
        placeholder="Username"
        {...register("username")}
      />
      <p>{errors.username?.message}</p>

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

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>

      <button type="submit">Sign Up</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;

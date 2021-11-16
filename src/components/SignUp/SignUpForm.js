import { useContext } from "react";
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
        console.log("Success");
        reset();
      })
      .catch(() => {
        console.log("Error");
        reset();
      });
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.username && "border-red-500"
          } rounded w-full py-2 px-3 text-gray-700 ${
            errors.username && "mb-3"
          } leading-tight focus:outline-none focus:shadow-outline`}
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.email && "border-red-500"
          } rounded w-full py-2 px-3 text-gray-700 ${
            errors.email && "mb-3"
          } leading-tight focus:outline-none focus:shadow-outline`}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.password && "border-red-500"
          } rounded w-full py-2 px-3 text-gray-700 ${
            errors.password && "mb-3"
          } leading-tight focus:outline-none focus:shadow-outline`}
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.confirmPassword && "border-red-500"
          } rounded w-full py-2 px-3 text-gray-700 ${
            errors.confirmPassword && "mb-3"
          } leading-tight focus:outline-none focus:shadow-outline`}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Already have an account?
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;

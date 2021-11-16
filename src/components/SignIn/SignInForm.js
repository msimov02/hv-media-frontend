import { useContext } from "react";
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

  const onSubmit = (data) => {
    const { email, password } = data;

    firebase
      .doSignInWithEmailAndPassword(email, password)
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
      <div className="mb-6">
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
          autoComplete="current-password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default SignInForm;

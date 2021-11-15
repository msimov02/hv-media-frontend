import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthUserContext, FirebaseContext } from "../../context";
import * as Yup from "yup";

const CreateArticleForm = () => {
  const firebase = useContext(FirebaseContext);
  const { authUser } = useContext(AuthUserContext);

  const validationSchema = Yup.object().shape({
    headline: Yup.string().required("Headline is required"),
    text: Yup.string().required("Text is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    firebase
      .articles()
      .push({
        ...data,
        userId: authUser.uid,
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
        name="headline"
        type="text"
        placeholder="Headline"
        {...register("headline")}
      />
      <p>{errors.headline?.message}</p>

      <input name="text" type="text" placeholder="Text" {...register("text")} />
      <p>{errors.text?.message}</p>

      <button type="submit">Create Article</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default CreateArticleForm;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpForm } from "./components/SignUp";
import { SignInForm } from "./components/SignIn";
import { withAuthentication } from "./hoc";
import * as ROUTES from "./constants/routes";
import { CreateArticleForm } from "./components/Article";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.LANDING} element={<SignInForm />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpForm />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInForm />} />
        <Route path={"/create-article"} element={<CreateArticleForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default withAuthentication(App);

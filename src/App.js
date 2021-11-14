import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpForm } from "./components/SignUp";
import { SignInForm } from "./components/SignIn";
import { withAuthentication } from "./hoc";
import * as ROUTES from "./constants/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.LANDING} element={<SignInForm />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpForm />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default withAuthentication(App);

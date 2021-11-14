import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext, FirebaseContext } from "../context";
import * as ROUTES from "../constants/routes";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const firebase = useContext(FirebaseContext);
    const navigate = useNavigate();
    const { authUser } = useContext(AuthUserContext);

    useEffect(() => {
      firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            navigate(ROUTES.SIGN_IN);
          }
        },
        () => navigate(ROUTES.SIGN_IN)
      );
    }, [firebase, navigate, authUser]);

    return condition(authUser) ? <Component {...props} /> : null;
  };
  return WithAuthorization;
};

export default withAuthorization;

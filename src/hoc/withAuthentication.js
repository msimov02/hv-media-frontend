import React, { useContext, useEffect, useState } from "react";
import { AuthUserContext, FirebaseContext } from "../context";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useContext(FirebaseContext);

    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem("authUser"))
    );

    useEffect(() => {
      firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem("authUser");
          setAuthUser(null);
        }
      );
    }, [firebase]);

    return (
      <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return WithAuthentication;
};

export default withAuthentication;

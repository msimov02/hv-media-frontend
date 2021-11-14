import { useContext, useState } from "react";
import { AuthUserContext, FirebaseContext } from "../context";

const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes("password");

const withEmailVerification = (Component) => {
  const WithEmailVerification = (props) => {
    const firebase = useContext(FirebaseContext);
    const { authUser } = useContext(AuthUserContext);

    const [isSent, setIsSent] = useState(false);

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => {
        setIsSent(true);
      });
    };

    return needsEmailVerification(authUser) ? (
      <div>
        {isSent ? (
          <p>
            E-Mail confirmation sent: Check your E-Mails (Spam folder included)
            for a confirmation E-Mail. Refresh this page once you confirmed your
            E-Mail.
          </p>
        ) : (
          <p>
            Verify your E-Mail: Check your E-Mails (Spam folder included) for a
            confirmation E-Mail or send another confirmation E-Mail.
          </p>
        )}
        <button
          type="button"
          onClick={onSendEmailVerification}
          disabled={isSent}
        >
          Send confirmation E-Mail
        </button>
      </div>
    ) : (
      <Component {...props} />
    );
  };
  return WithEmailVerification;
};

export default withEmailVerification;

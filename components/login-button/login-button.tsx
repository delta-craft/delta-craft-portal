import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

const LoginButton: React.FC = () => {
  const [session, loading] = useSession();

  if (!session)
    return (
      <div className="d-flex">
        <button
          className="btn btn-primary ms-auto"
          onClick={() => signIn("discord")}
        >
          Přihlásit se
        </button>
      </div>
    );

  return (
    <div className="d-flex">
      <div>{session.user.name}</div>
      <button className="btn btn-primary ms-auto" onClick={() => signOut()}>
        Odhlásit se
      </button>
    </div>
  );
};

export default LoginButton;

import React, { useEffect } from "react";
import { useSession } from "next-auth/client";

const AuthContainer: React.FC = ({ children }) => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        localStorage.removeItem("token");
        return;
      }
      const token = session.accessToken as string;
      localStorage.setItem("token", token);
    }
  }, [loading, session]);

  return <div>{children}</div>;
};

export default AuthContainer;

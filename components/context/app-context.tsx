import { Session } from "next-auth";
import { useSession } from "next-auth/client";
import React, { createContext, useEffect, useState } from "react";

export interface IAppContextVals {
  session: Session;
}

export const defaults: IAppContextVals = {
  session: null,
};

export const AppContext = createContext<IAppContextVals>(defaults);

const AppContextProvider: React.FC<{} | IAppContextVals> = ({ children }) => {
  const [session, loading] = useSession();
  const [sessionRef, setSessionRef] = useState(session);

  useEffect(() => {
    if (!loading) {
      setSessionRef(session);
      if (session)
        localStorage.setItem("internal-session", JSON.stringify(session));
      else localStorage.removeItem("internal-session");
    }
  }, [session, loading]);

  useEffect(() => {
    const sessionJson = localStorage.getItem("internal-session");
    if (sessionJson) {
      const decoded = JSON.parse(sessionJson) as Session;
      if (decoded) setSessionRef(decoded);
    }
  }, []);

  return (
    <AppContext.Provider value={{ session: sessionRef }}>
      {children}
    </AppContext.Provider>
  );
};

export const AContext = {
  Provider: AppContextProvider,
  Consumer: AppContext,
};

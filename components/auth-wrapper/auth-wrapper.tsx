import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../src/hooks";

const withAuth = (Component: any) => {
  const Wrapper = (): JSX.Element => {
    const router = useRouter();
    const { session } = useAppContext();

    useEffect(() => {
      if (!session) {
        router.push("/");
      }
    }, [session]);

    // TODO: FIX
    return (
      <div>
        <Component />
      </div>
    );
  };

  return Wrapper;
};

export default withAuth;

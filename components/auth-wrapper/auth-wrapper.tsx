import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../src/hooks";
import Fade from "@material-ui/core/Fade";

const withAuth = (Component: any) => {
  const Wrapper = (): JSX.Element => {
    const router = useRouter();
    const { session } = useAppContext();

    useEffect(() => {
      if (!session) {
        router.push("/");
      }
    }, [session]);

    return (
      <div>
        <Fade in={!session || true}>
          <div></div>
        </Fade>
        {session && <Component />}
      </div>
    );
  };

  return Wrapper;
};

export default withAuth;

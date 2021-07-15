import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { LoginConfirmation } from ".";
import { getLoginQuery } from "../../src/gql/client/queries";
import { GetLoginSession } from "../../src/gql/client/types/GetLoginSession";
import { useAppContext } from "../../src/hooks";
import RefreshIcon from "@material-ui/icons/Refresh";
import toast from "react-hot-toast";

const LoginContainer: React.FC = () => {
  const { session } = useAppContext();

  const handleRefresh = async (notify: boolean = true) => {
    if (notify) toast("Občerstvuji...");
    await refetch();
  };

  const { data, loading, error, refetch } =
    useQuery<GetLoginSession>(getLoginQuery);

  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Nastala chyba</div>;
  }

  const { loginSession } = data;

  if (!loginSession) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Typography variant="h5" className="my-3">
          Není zde nic ke schválení
        </Typography>
        <Typography variant="body1" className="mt-3 mb-4">
          Nejprve se zkus připojit na server...
        </Typography>
        <Button onClick={() => handleRefresh(true)} variant="outlined">
          <RefreshIcon />
          Obnovit
        </Button>
      </div>
    );
  }

  const { auth } = loginSession;

  // if (auth === true) {
  //   return (
  //     <div className="d-flex flex-column justify-content-center align-items-center">
  //       <Typography variant="h5" className="my-3">
  //         Přihlášení schváleno!
  //       </Typography>
  //       <Button onClick={() => handleRefresh(true)} variant="outlined">
  //         <RefreshIcon />
  //         Obnovit
  //       </Button>
  //     </div>
  //   );
  // }
  // if (auth === false) {
  //   return (
  //     <div className="d-flex flex-column justify-content-center align-items-center">
  //       <Typography variant="h5" className="my-3">
  //         Přihlášení zamítnuto!
  //       </Typography>
  //       <Button onClick={() => handleRefresh(true)} variant="outlined">
  //         <RefreshIcon />
  //         Obnovit
  //       </Button>
  //     </div>
  //   );
  // }

  return <LoginConfirmation session={loginSession} refetch={handleRefresh} />;
};

export default LoginContainer;

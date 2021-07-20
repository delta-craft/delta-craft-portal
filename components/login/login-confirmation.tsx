import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetLoginSession_loginSession } from "../../src/gql/client/types/GetLoginSession";
import publicIp from "public-ip";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {
  UpdateLoginSession,
  UpdateLoginSessionVariables,
} from "../../src/gql/client/types/UpdateLoginSession";
import { useMutation } from "@apollo/client";
import { updateLoginMutation } from "../../src/gql/client/mutations";
import toast from "react-hot-toast";
import RefreshIcon from "@material-ui/icons/Refresh";

interface IProps {
  session: GetLoginSession_loginSession;
  refetch: (notify?: boolean) => Promise<void>;
}

const LoginConfirmation: React.FC<IProps> = ({ session, refetch }) => {
  const { updated, ip, authRequest, auth } = session;

  const [currentIP, setCurrentIP] = useState<string>(null);

  const [confirmLogin] = useMutation<
    UpdateLoginSession,
    UpdateLoginSessionVariables
  >(updateLoginMutation);

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    const cIP = await publicIp.v4();
    setCurrentIP(cIP);
  };

  const handleUpdate = async (confirm: boolean) => {
    const res = await confirmLogin({ variables: { confirm } });

    const { data, errors } = res;

    if (errors || !data) {
      toast.error("Něco se nepovedlo");
      await refetch(false);
      return;
    }

    const r = data.updateLoginSession;

    if (r && confirm) {
      toast.success("Schváleno!");
    }
    if (r && !confirm) {
      toast.success("Zamítnuto!");
    }

    await refetch(false);
  };

  const exact = ip === currentIP;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h5">Žádost o přihlášení</Typography>
      {auth === true && (
        <Typography variant="h6" className="my-5">
          Schválena
        </Typography>
      )}
      {auth === false && (
        <Typography variant="h6" className="my-5">
          Zamítnuta
        </Typography>
      )}
      <Divider style={{ width: "20vw" }} className="my-3" />
      <Typography className="my-2">
        Zažádáno: {moment(authRequest).format("DD.MM.YYYY HH:mm")}
      </Typography>
      <div className="d-flex flex-row align-items-baseline my-2">
        <Typography className="mx-1">IP Adresa: {ip}</Typography>
        {currentIP && (
          <Tooltip title={`Tvá aktuální IP: ${currentIP}`}>
            <div className="mx-1">
              {exact && (
                <Chip label="Shoduje se" size="small" color="success" />
              )}
              {!exact && (
                <Chip label="Neshoduje se" size="small" color="error" />
              )}
            </div>
          </Tooltip>
        )}
      </div>
      {auth == null && (
        <div className="d-flex flex-row my-4">
          <Button
            color="error"
            variant="contained"
            className="mx-2"
            onClick={() => handleUpdate(false)}
          >
            Zamítnout
          </Button>
          <Button
            color="success"
            variant="contained"
            className="mx-2"
            onClick={() => handleUpdate(true)}
          >
            Schválit
          </Button>
        </div>
      )}

      {auth && (
        <Button onClick={() => refetch(true)} variant="outlined">
          <RefreshIcon />
          Obnovit
        </Button>
      )}
    </div>
  );
};

export default LoginConfirmation;

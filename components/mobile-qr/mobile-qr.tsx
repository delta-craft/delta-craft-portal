import React from "react";
import { useAppContext } from "../../src/hooks";
import QRCode from "react-qr-code";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const MobileQR: React.FC = () => {
  const { session } = useAppContext();

  if (!session) {
    return null;
  }

  const mobileToken = (session.links["mobileToken"] as string) ?? "";

  if (mobileToken.length < 1) {
    return null;
  }

  // TODO: Implement manual token refresh

  return (
    <Paper className="p-4 d-flex justify-content-around align-items-center">
      <div className="text-center">
        <Typography variant="h5">DeltaCraft klíč</Typography>
        <Typography variant="body1">Naskenuj mobilní appkou</Typography>
        {/* <Button>Refresh tokenu</Button> */}
      </div>
      <QRCode value={mobileToken} />
    </Paper>
  );
};

export default MobileQR;

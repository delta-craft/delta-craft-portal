import React from "react";
import { useAppContext } from "../../src/hooks";
import QRCode from "react-qr-code";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";

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
        <div className="d-flex my-2 justify-content-center align-items-center">
          <Link
            href="https://appdistribution.firebase.dev/i/ee87d1ca2550ba27"
            passHref
          >
            <a target="_blank">
              <Button className="mx-2 d-flex align-items-center">
                Android
              </Button>
            </a>
          </Link>
          <Link
            href="https://appdistribution.firebase.dev/i/4c0d73faa1d9e854"
            passHref
          >
            <a target="_blank">
              <Button className="mx-2 ">iOS</Button>
            </a>
          </Link>
        </div>
        {/* <Button>Refresh tokenu</Button> */}
      </div>
      <QRCode value={mobileToken} />
    </Paper>
  );
};

export default MobileQR;

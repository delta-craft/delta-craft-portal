import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useAppContext } from "../../src/hooks";
import { updateConsentMutation } from "../../src/gql/client/mutations";
import { useMutation } from "@apollo/client";
import { UpdateConsent } from "../../src/gql/client/types/UpdateConsent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import toast from "react-hot-toast";

interface IProps {
  onUpdate?: () => Promise<any>;
  lastConsentAccepted?: number;
  lastConsent?: number;
}

const ConsentReminderBox: React.FC<IProps> = ({
  onUpdate,
  lastConsentAccepted,
  lastConsent,
}) => {
  const { session } = useAppContext();
  const [open, setOpen] = useState(false);

  const [update] = useMutation<UpdateConsent>(updateConsentMutation);

  const handleUpdate = async () => {
    setOpen(true);
    const { data, errors } = await update();
    if (data.updateConsent) {
      if (onUpdate) await onUpdate();
      toast.success("Díky za souhlas!");
    } else toast.error("Nastala chyba");
    setOpen(false);
  };

  if (!session) return null;

  if (lastConsentAccepted > lastConsent) {
    return (
      <Paper className="py-3 px-3 my-3 d-flex flex-column align-items-center justify-content-around">
        <Typography>Máme všechny potřebné souhlasy!</Typography>
        <Typography variant="body2" className="mt-2">
          Až od tebe zase budeme něco potřebovat, nepustíme tě na server.
        </Typography>
      </Paper>
    );
  }

  return (
    <div>
      <Backdrop open={open} style={{ zIndex: 5000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper className="py-3 px-3 my-3 d-flex align-items-center justify-content-around">
        <Typography>Potřebujeme od tebe další souhlas</Typography>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Přijmout vše
        </Button>
      </Paper>
    </div>
  );
};

export default ConsentReminderBox;

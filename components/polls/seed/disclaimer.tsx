import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Disclaimer: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogContent>
        <DialogContentText>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Typography className="text-center">
              Způsobilost k hlasování je podmíněna následujícími kritérii.
            </Typography>
            <Typography className="text-center">
              Tato kritéria lze splnit kdykoliv před udělením prvního hlasu.
            </Typography>
            <ul className="my-2">
              <li>Uživatel dokončil registraci</li>
              <li>Uživatel udělil souhlas s podmínkami</li>
              <li>Uživatel se alespoň jednou připojil na server</li>
            </ul>
            <Button onClick={handleClose} variant="contained" className="my-2">
              Souhlasím, že bez splnění kritérií se můj hlas nepočítá
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default Disclaimer;

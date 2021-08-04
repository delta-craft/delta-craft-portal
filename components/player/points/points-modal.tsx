import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import React, { useState } from "react";
import PointsContainer from "./points-container";
import twemoji from "twemoji";

const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

interface IProps {
  pointId: string;
}

const PointsModal: React.FC<IProps> = ({ pointId }) => {
  const [open, setOpen] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeNotAvailalble = () => {
    handleClose();
    setNotAvailable(true);
  };

  if (notAvailable) {
    return (
      <div className="d-flex flex-row align-items-center justify-content-center w-100">
        <div
          style={{ width: 30 }}
          dangerouslySetInnerHTML={{ __html: emojify("😔") }}
        />
      </div>
    );
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Podrobnosti
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <div>
            <PointsContainer
              pointId={pointId}
              closeModalNotAvailable={closeNotAvailalble}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointsModal;

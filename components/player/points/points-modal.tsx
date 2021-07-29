import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import React, { useState } from "react";
import PointsContainer from "./points-container";

interface IProps {
  pointId: string;
}

const PointsModal: React.FC<IProps> = ({ pointId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Podrobnosti
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <div>
            <PointsContainer pointId={pointId} closeModal={handleClose} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointsModal;

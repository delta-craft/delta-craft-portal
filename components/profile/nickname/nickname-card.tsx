import { useMutation, useQuery } from "@apollo/client";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/core/Skeleton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { updateNicknameMutation } from "../../../src/gql/client/mutations";
import { getNicknameQuery } from "../../../src/gql/client/queries";
import { GetNickname } from "../../../src/gql/client/types/GetNickname";
import {
  UpdateNickname,
  UpdateNicknameVariables,
} from "../../../src/gql/client/types/UpdateNickname";
import { useAppContext } from "../../../src/hooks";
import toast from "react-hot-toast";

const NicknameCard: React.FC = () => {
  const [nick, setNick] = useState("");
  const [open, setOpen] = useState(false);
  const { session } = useAppContext();

  const { data, loading, error } = useQuery<GetNickname>(getNicknameQuery);

  const [updateNick] = useMutation<UpdateNickname, UpdateNicknameVariables>(
    updateNicknameMutation
  );

  const handleSubmit = async () => {
    if (nick.length < 4) return;
    setOpen(true);

    const { data, errors } = await updateNick({
      variables: { nickname: nick },
    });

    if (data.updateNickname) toast.success("Nickname úspěšně uložen!");
    else toast.error("Chyba při změně nicku");

    setOpen(false);
  };

  if (loading || !data || error || !session) {
    return (
      <Paper className="p-4 my-3" elevation={4}>
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </Paper>
    );
  }

  const { getUser } = data;

  const { userConnections } = getUser;

  const name = userConnections[0].name;

  return (
    <div>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className="p-4 my-3" elevation={4}>
        <div className="row">
          <div className="col-12 col-md-6">
            <Typography>
              Pro správné propojení bodů potřebujeme tvůj nickname ve hře
            </Typography>
          </div>
          <div className="col-12 col-md-6">
            <TextField
              variant="standard"
              label="Nickname ve hře"
              value={nick == "" ? name : nick}
              fullWidth
              onChange={(event) => setNick(event.currentTarget.value)}
            />
          </div>
        </div>
        <Button
          color="primary"
          variant="contained"
          disabled={nick.length < 4 || nick === name}
          onClick={handleSubmit}
        >
          Uložit
        </Button>
      </Paper>
    </div>
  );
};

export default NicknameCard;

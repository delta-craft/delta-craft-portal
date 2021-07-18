import { useMutation } from "@apollo/client";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { signOut, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateNicknameMutation } from "../../src/gql/client/mutations";
import {
  UpdateNickname,
  UpdateNicknameVariables,
} from "../../src/gql/client/types/UpdateNickname";
import { useAppContext } from "../../src/hooks";

const Registration: React.FC = () => {
  const [nick, setNick] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { session } = useAppContext();
  const [updateNick] = useMutation<UpdateNickname, UpdateNicknameVariables>(
    updateNicknameMutation
  );

  // TODO: If user already registred redirect to homepage

  useEffect(() => {}, [session]);

  const handleRegister = async () => {
    if (nick.length < 4) return;
    setOpen(true);

    const { data, errors } = await updateNick({
      variables: { nickname: nick },
    });

    setOpen(false);
    if (data.updateNickname) {
      toast.success("Registrace dokončena!");
      router.push("/consents");
      return;
    } else toast.error("Chyba při registraci");
  };

  useEffect(() => {
    if (nick.length > 0) {
      setNick(nick.trim());
    }
  }, [nick]);

  if (!session) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn("discord")}
        >
          Přihlásit se přes Discord
        </Button>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="container">
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h3" className="my-3">
          Registrace
        </Typography>
        <div className="my-3 d-flex flex-row align-items-center">
          <Typography variant="body1">Uživatel: {user.name}</Typography>
          <div style={{ width: 10 }} />
          <Button color="primary" variant="outlined" onClick={() => signOut()}>
            Změnit
          </Button>
        </div>
        <TextField
          className="my-3"
          fullWidth
          placeholder={`Třeba '${user.name}'`}
          variant="standard"
          value={nick}
          onChange={(event) => setNick(event.currentTarget.value)}
          autoCorrect="off"
          autoComplete="off"
          label="Nick ve hře"
        />

        {/* <TextField
          className="my-3"
          variant="standard"
          label="Pravidla"
          multiline
          disabled
          fullWidth
          value={""}
          autoCorrect="off"
          autoComplete="off"
          rows={8}
        /> */}
        <Button
          className="my-3"
          color="primary"
          variant="contained"
          onClick={handleRegister}
          disabled={nick.length < 3}
        >
          Dokončit registraci
        </Button>
      </div>
    </div>
  );
};

export default Registration;

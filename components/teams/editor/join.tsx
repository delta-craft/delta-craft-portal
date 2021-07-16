import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { joinTeamMutation } from "../../../src/gql/client/mutations";
import {
  JoinTeam,
  JoinTeamVariables,
} from "../../../src/gql/client/types/JoinTeam";

const JoinTeamComp: React.FC = () => {
  const router = useRouter();

  const [code, setCode] = useState("");

  const [join] = useMutation<JoinTeam, JoinTeamVariables>(joinTeamMutation);

  const codeLength = 15;

  const count = code.length;

  const handleClick = async () => {
    if (count !== codeLength) return;

    const res = await join({ variables: { code } });

    const { data, errors } = res;

    if (errors || !data.joinTeam) {
      toast.error("Nastala chyba");
    }

    if (data.joinTeam) {
      toast.success("Připojeno k týmu");
      router.push("/teams");
    }
  };

  return (
    <Paper className="p-5">
      <TextField
        label="Kód pro připojení"
        variant="standard"
        fullWidth
        value={code}
        onChange={(event) => setCode(event.currentTarget.value)}
        helperText={`${count}/${codeLength}`}
      />
      <Button
        className="mt-3"
        onClick={handleClick}
        variant="contained"
        disabled={count !== codeLength}
      >
        Uložit
      </Button>
    </Paper>
  );
};

export default JoinTeamComp;

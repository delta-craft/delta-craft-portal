import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createOrUpdateTeamMutation } from "../../../src/gql/client/mutations";
import {
  CreateOrUpdateTeam,
  CreateOrUpdateTeamVariables,
} from "../../../src/gql/client/types/CreateOrUpdateTeam";

const CreateTeam: React.FC = () => {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");

  const [update] = useMutation<CreateOrUpdateTeam, CreateOrUpdateTeamVariables>(
    createOrUpdateTeamMutation
  );

  const max = 30;

  const count = teamName.length;

  const handleClick = async () => {
    if (count > max || count === 0) return;

    const res = await update({ variables: { teamName } });

    const { data, errors } = res;

    if (errors || !data.createOrUpdateTeam) {
      toast.error("Nastala chyba");
    }

    if (data.createOrUpdateTeam) {
      toast.success("Tým vytvořen!");
      router.push("/teams/edit");
    }
  };

  return (
    <Paper className="p-5">
      <TextField
        label="Název týmu"
        variant="standard"
        fullWidth
        value={teamName}
        onChange={(event) => setTeamName(event.currentTarget.value)}
        error={count > max}
        helperText={`${count}/${max}`}
      />
      <Button
        className="mt-3"
        onClick={handleClick}
        variant="contained"
        disabled={count > max || count === 0}
      >
        Vytvořit tým
      </Button>
    </Paper>
  );
};

export default CreateTeam;

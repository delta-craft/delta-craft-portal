import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { GetPoll_poll_pollOptions } from "../../../src/gql/client/types/GetPoll";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  UpdateVote,
  UpdateVoteVariables,
} from "../../../src/gql/client/types/UpdateVote";
import { useMutation } from "@apollo/client";
import { updateVoteMutation } from "../../../src/gql/client/mutations";

interface IProps {
  data: GetPoll_poll_pollOptions;
  onUpdate: () => Promise<any>;
}

const SeedOption: React.FC<IProps> = ({ data, onUpdate }) => {
  const voted = data.voted === true;

  const [updateV] = useMutation<UpdateVote, UpdateVoteVariables>(
    updateVoteMutation
  );

  const update = async () => {
    await updateV({ variables: { optionId: data.id } });
    await onUpdate();
  };

  return (
    <Paper className="p-4 m-2  d-flex flex-column align-items-center justify-content-between h-100">
      <div className="lightbox">
        <Image
          src={`/polls/seed/${data.image}`}
          width={250}
          height={250}
          quality={100}
          alt=""
        />
      </div>
      {/* <div className="">
        <ReactMarkdown
          plugins={[gfm]}
          className="consent-markdown"
          components={{}}
        >
          {data.description}
        </ReactMarkdown>
      </div> */}
      {!voted && (
        <Button variant="contained" onClick={update}>
          Hlasovat
        </Button>
      )}
      {voted && (
        <Button variant="outlined" onClick={update}>
          Zrušit hlas
        </Button>
      )}
    </Paper>
  );
};

export default SeedOption;

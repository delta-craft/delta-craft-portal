import { useQuery } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { getPollQuery } from "../../../src/gql/client/queries";
import {
  GetPoll,
  GetPollVariables,
} from "../../../src/gql/client/types/GetPoll";
import SeedOption from "./seed-option";
import Disclaimer from "./disclaimer";

const SeedPollContainer: React.FC = () => {
  const { data, loading, error, refetch } = useQuery<GetPoll, GetPollVariables>(
    getPollQuery,
    {
      variables: { id: "1" },
    }
  );

  if (loading) {
    return <LinearProgress />;
  }

  if (error || !data) {
    return null;
  }

  const { poll } = data;

  return (
    <div className="text-center">
      <Disclaimer />
      <Typography variant="h4" className="my-3">
        {poll?.title}
      </Typography>
      <Typography variant="h6" className="my-3">
        Vyber jeden/více
      </Typography>
      <div className="d-flex align-items-stretch flex-wrap">
        {poll?.pollOptions?.map((x, i) => (
          <div key={i} className="col-12 col-md-4 my-2">
            <SeedOption data={x} onUpdate={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedPollContainer;

import { useQuery } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { getPlayerPointSummaryQuery } from "../../../src/gql/client/queries";
import {
  PlayerPointSummary,
  PlayerPointSummaryVariables,
} from "../../../src/gql/client/types/PlayerPointSummary";

interface IProps {
  ucId: string;
}

const TotalPoint: React.FC<IProps> = ({ ucId }) => {
  const { data, loading, error } = useQuery<
    PlayerPointSummary,
    PlayerPointSummaryVariables
  >(getPlayerPointSummaryQuery, {
    variables: { ucId },
  });

  if (loading) return <Typography variant="body2">Počítám...</Typography>;

  if (error || !data.getPlayerPointSummary) return null;

  const { summary } = data.getPlayerPointSummary;

  const { mining, crafting, warfare, journey } = summary;

  const total = mining + crafting + warfare + journey;

  return <Typography variant="body2">{total} bodů</Typography>;
};

export default TotalPoint;

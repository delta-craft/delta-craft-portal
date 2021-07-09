import { useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { StatChart } from ".";
import { getPlayerPointSummaryQuery } from "../../src/gql/client/queries";
import {
  PlayerPointSummary,
  PlayerPointSummaryVariables,
} from "../../src/gql/client/types/PlayerPointSummary";

interface IProps {
  userConnectionId: string;
  height?: number | string;
  width?: number | string;
}

const PlayerStatChart: React.FC<IProps> = ({
  userConnectionId,
  height,
  width,
}) => {
  const { data, loading, error } = useQuery<
    PlayerPointSummary,
    PlayerPointSummaryVariables
  >(getPlayerPointSummaryQuery, { variables: { ucId: userConnectionId } });

  if (loading) {
    return <CircularProgress />;
  }
  if (error || !data.getPlayerPointSummary) return null;

  const { getPlayerPointSummary } = data;

  return (
    <StatChart
      points={getPlayerPointSummary.summary}
      height={height}
      width={width}
    />
  );
};

export default PlayerStatChart;

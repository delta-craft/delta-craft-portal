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
  nick: string;
  height?: number | string;
  width?: number | string;
  fontSize?: number;
  legendPosition?: "left" | "top" | "right" | "bottom" | "center" | "chartArea";
}

const PlayerStatChart: React.FC<IProps> = ({
  nick,
  height,
  width,
  legendPosition = "top",
  fontSize = 12,
}) => {
  const { data, loading, error } = useQuery<
    PlayerPointSummary,
    PlayerPointSummaryVariables
  >(getPlayerPointSummaryQuery, { variables: { nick } });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }
  if (error || !data.player) return null;

  const { player } = data;

  const { pointSummary } = player;

  return (
    <StatChart
      points={pointSummary.summary}
      height={height}
      width={width}
      legendPosition={legendPosition}
      fontSize={fontSize}
    />
  );
};

export default PlayerStatChart;

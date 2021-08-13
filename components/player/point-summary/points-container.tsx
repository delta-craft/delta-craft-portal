import { useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { getPlayerStatsQuery } from "../../../src/gql/client/queries";
import {
  PlayerStats,
  PlayerStatsVariables,
} from "../../../src/gql/client/types/PlayerStats";
import PointTabs from "./point-tabs";

interface IProps {
  nick: string;
}

const PointsContainer: React.FC<IProps> = ({ nick }) => {
  const { data, loading, error } = useQuery<PlayerStats, PlayerStatsVariables>(
    getPlayerStatsQuery,
    { variables: { playerNickname: nick } }
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error || !data) return null;

  const { player } = data;

  const { stats } = player;

  return <PointTabs stats={stats} />;
};

export default PointsContainer;

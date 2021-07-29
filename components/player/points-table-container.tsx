import { useQuery } from "@apollo/client";
import { LinearProgress } from "@material-ui/core";
import React from "react";
import { PointsTable, PointsTable2 } from ".";
import { getPlayerPointsQuery } from "../../src/gql/client/queries";
import {
  GetPlayerPoints,
  GetPlayerPointsVariables,
} from "../../src/gql/client/types/GetPlayerPoints";

interface IProps {
  nick: string;
}

const PointsTableContainer: React.FC<IProps> = ({ nick }) => {
  const { data, loading, error } = useQuery<
    GetPlayerPoints,
    GetPlayerPointsVariables
  >(getPlayerPointsQuery, { variables: { nick } });

  if (loading) {
    return <LinearProgress />;
  }

  if (error) return <div>{error.message}</div>;

  const { player } = data;

  if (!player.points) return null;

  return <PointsTable2 points={player.points} />;
};

export default PointsTableContainer;

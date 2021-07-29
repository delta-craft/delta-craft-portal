import { useQuery } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { getPointQuery } from "../../../src/gql/client/queries";
import {
  PointQuery,
  PointQueryVariables,
} from "../../../src/gql/client/types/PointQuery";
import { PointType } from "../../../src/models/enums";
import { PlayerKillCard } from "./warfare";

interface IProps {
  pointId: string;
  closeModal?: () => void;
}

const PointsContainer: React.FC<IProps> = ({ pointId, closeModal }) => {
  const { data, loading, error } = useQuery<PointQuery, PointQueryVariables>(
    getPointQuery,
    { variables: { id: pointId } }
  );

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const { pointType, pointTags } = data.point;

  if (pointType === PointType.Warfare) {
    const type = pointTags.find((x) => x.key === "Type");
    if (type != null) {
      if (type.value === "PVP") {
        return <PlayerKillCard tags={pointTags} />;
      }
    }
  }

  closeModal();

  return null;
};

export default PointsContainer;

import React from "react";
import { GetPlayerDetail_player_points } from "../../../src/gql/client/types/GetPlayerDetail";
import { PointType } from "../../../src/models/enums";
import { PlayerKillCard } from "./warfare";

interface IProps {
  point: GetPlayerDetail_player_points;
}

const PointsContainer: React.FC<IProps> = ({ point }) => {
  const { pointType, pointTags } = point;

  if (pointType === PointType.Warfare) {
    const type = pointTags.find((x) => x.key === "Type");
    if (type != null) {
      if (type.value === "PVP") {
        return <PlayerKillCard tags={pointTags} />;
      }
    }
  }

  return null;
};

export default PointsContainer;

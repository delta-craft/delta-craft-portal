import { UserConnections } from "../../src/db/entities/UserConnections";
import { PointType } from "../../src/models/enums";
import { IPointSummary } from "../../src/models/types";
import { calculateRatios } from "../../src/utils/point-ratio";

export const calcPlayerSummary = (userConn: UserConnections) => {
  const { points } = userConn;

  let mining = 0;
  let crafting = 0;
  let warfare = 0;
  let journey = 0;

  points.forEach((element) => {
    if (element.pointType === PointType.Mining) mining += element.points;
    if (element.pointType === PointType.Crafting) crafting += element.points;
    if (element.pointType === PointType.Warfare) warfare += element.points;
    if (element.pointType === PointType.Journey) journey += element.points;
  });

  const summary: IPointSummary = {
    mining,
    crafting,
    warfare,
    journey,
  };

  const ratios = calculateRatios(summary);

  return { summary, ratios };
};

import { IPointSummary } from "../models/types";

export const calculateRatios = (points: IPointSummary) => {
  const { mining, crafting, warfare, journey } = points;

  const total = mining + crafting + warfare + journey;

  const ratio: IPointSummary = {
    mining: calculateRatio(total, mining),
    crafting: calculateRatio(total, crafting),
    warfare: calculateRatio(total, warfare),
    journey: calculateRatio(total, journey),
  };

  return ratio;
};

const calculateRatio = (total: number, value: number): number =>
  total === 0 ? 0 : value / total;

export const totalPoints = (points: IPointSummary): number => {
  const { mining, crafting, warfare, journey } = points;

  const total = mining + crafting + warfare + journey;
  return total;
};

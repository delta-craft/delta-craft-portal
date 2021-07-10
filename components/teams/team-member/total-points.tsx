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
  className?: string;
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "inherit";
}

const TotalPoint: React.FC<IProps> = ({
  ucId,
  variant = "body2",
  className,
}) => {
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

  return (
    <Typography variant={variant} className={className}>
      {total} bodů
    </Typography>
  );
};

export default TotalPoint;

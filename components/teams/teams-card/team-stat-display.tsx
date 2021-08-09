import { useQuery } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { getTeamPointSummaryQuery } from "../../../src/gql/client/queries";
import {
  GetTeamSummary,
  GetTeamSummaryVariables,
} from "../../../src/gql/client/types/GetTeamSummary";
import { totalPoints } from "../../../src/utils/point-ratio";

interface IProps {
  teamId: string;
}

const TeamStatDisplay: React.FC<IProps> = ({ teamId }) => {
  const { data, loading, error } = useQuery<
    GetTeamSummary,
    GetTeamSummaryVariables
  >(getTeamPointSummaryQuery, { variables: { teamId } });

  if (loading) return <LinearProgress />;
  if (error || !data.team) return null;

  const { team } = data;

  const { pointSummary } = team;
  const { summary, ratios } = pointSummary;

  if (
    ratios.crafting === 0 &&
    ratios.journey === 0 &&
    ratios.mining === 0 &&
    ratios.warfare === 0
  )
    return null;

  return (
    <div className="d-flex flex-column">
      <div className="progress w-100" style={{ height: 7.5 }}>
        <Tooltip title={`Mining - ${summary.mining} bodů`}>
          <div
            className="progress-bar bkg-mining"
            role="progressbar"
            style={{ width: `${ratios.mining * 100}%` }}
          ></div>
        </Tooltip>
        <Tooltip title={`Crafting - ${summary.crafting} bodů`}>
          <div
            className="progress-bar bkg-crafting"
            role="progressbar"
            style={{ width: `${ratios.crafting * 100}%` }}
          ></div>
        </Tooltip>
        <Tooltip title={`Warfare - ${summary.warfare} bodů`}>
          <div
            className="progress-bar bkg-warfare"
            role="progressbar"
            style={{ width: `${ratios.warfare * 100}%` }}
          ></div>
        </Tooltip>
        <Tooltip title={`Journey - ${summary.journey} bodů`}>
          <div
            className="progress-bar bkg-journey"
            role="progressbar"
            style={{ width: `${ratios.journey * 100}%` }}
          ></div>
        </Tooltip>
      </div>
      <div className="my-2">
        <Typography>{totalPoints(summary)} bodů</Typography>
      </div>
    </div>
  );
};

export default TeamStatDisplay;

import { useQuery } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { getMajorTeamsSummary } from "../../src/gql/client/queries";
import { MajorTeamsSumarry } from "../../src/gql/client/types/MajorTeamsSumarry";
import Typography from "@material-ui/core/Typography";

const MainTeamsBar: React.FC = () => {
  const { data, loading, error } = useQuery<MajorTeamsSumarry>(
    getMajorTeamsSummary,
    { pollInterval: 3000 }
  );

  if (loading) {
    return <LinearProgress />;
  }

  if (error || !data.majorTeamsSummary) return null;

  const { blue, red } = data.majorTeamsSummary;

  const {
    crafting: craftingB,
    mining: miningB,
    warfare: warfareB,
    journey: journeyB,
  } = blue.summary;
  const {
    crafting: craftingR,
    mining: miningR,
    warfare: warfareR,
    journey: journeyR,
  } = red.summary;

  const blueTotal = craftingB + miningB + journeyB + warfareB;
  const redTotal = craftingR + miningR + journeyR + warfareR;

  const bluePercentage = (blueTotal / (blueTotal + redTotal)) * 100;

  const redPercentage = 100 - bluePercentage;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Blue</h3>
        <h3>Red</h3>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${bluePercentage}%` }}
        ></div>
        <div
          className="progress-bar bkg-red"
          role="progressbar"
          style={{ width: `${redPercentage}%` }}
        ></div>
      </div>
      <div className="d-flex justify-content-between pt-2">
        <Typography>{blueTotal} bodů</Typography>
        <Typography>{redTotal} bodů</Typography>
      </div>
    </div>
  );
};

export default MainTeamsBar;

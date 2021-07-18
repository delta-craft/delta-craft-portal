import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import twemoji from "twemoji";
import { GetPlayers_players } from "../../src/gql/client/types/GetPlayers";
import { totalPoints } from "../../src/utils/point-ratio";
import { SummaryChart } from "../summary-chart";
import Image from "next/image";

interface IProps {
  player: GetPlayers_players;
  index: number;
}

const PlayerCard: React.FC<IProps> = ({ player, index }) => {
  const { name, team, pointSummary } = player;

  const { summary, ratios } = pointSummary;

  const icon =
    team?.majorTeam === "red"
      ? "1f534"
      : team?.majorTeam === "blue"
      ? "1f535"
      : "";

  return (
    <Paper className="m-2 px-4 py-3">
      <div className="d-flex">
        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
          <Link href={`/players/${name}`} passHref>
            <Image
              src={`https://minotar.net/helm/${name}/100.svg`}
              alt=""
              className="pointer hover-shadow"
              height={100}
              width={100}
            />
            {/* <img
              src={`https://minotar.net/helm/${name}/100`}
              className="mb-2 "
              alt="..."
            /> */}
          </Link>
          <Typography variant="h3" className="mt-2">
            #{index + 1}
          </Typography>
        </div>
        <div className="col-6 d-flex flex-column justify-content-around align-items-center">
          <div className="d-flex flex-column w-100 text-center">
            <Link href={`/players/${name}`} passHref>
              <Typography variant="h5" className="pointer">
                {name}
              </Typography>
            </Link>
            <div className="d-flex flex-row justify-content-center align-items-center">
              {team?.majorTeam && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${twemoji.base}svg/${icon}.svg`}
                  className="mx-1"
                  alt="..."
                  height="20"
                />
              )}
              <Link href={`/teams/${team?.id}`} passHref>
                <Typography className="pointer">{team?.name}</Typography>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column w-100 text-center">
            <Typography>{totalPoints(summary)} bodů</Typography>
            <div className="w-100">
              <SummaryChart summary={summary} ratios={ratios} />
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PlayerCard;

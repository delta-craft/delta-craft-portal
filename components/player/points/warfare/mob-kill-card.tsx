import Paper from "@material-ui/core/Paper";
import React from "react";
import { GetPlayerDetail_player_points_pointTags } from "../../../../src/gql/client/types/GetPlayerDetail";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import { LinearProgress } from "@material-ui/core";

interface IProps {
  tags: GetPlayerDetail_player_points_pointTags[];
}

const MobKillCard: React.FC<IProps> = ({ tags }) => {
  const t = Object.fromEntries(tags.map((x) => [x.key, x.value]));

  return (
    <Paper className="p-md-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div style={{ position: "relative", height: 200, width: "100%" }}>
          <Image
            src={`/img/points/mobs/${t.Entity}.webp`}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        {t.Participation && (
          <div
            style={{ width: "100%" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Typography className="my-2">
              {parseFloat(t.Participation) * 100}%
            </Typography>
            <LinearProgress
              variant="determinate"
              className="w-75"
              value={parseFloat(t.Participation) * 100}
            />
          </div>
        )}
      </div>
    </Paper>
  );
};

export default MobKillCard;

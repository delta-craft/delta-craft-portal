import Paper from "@material-ui/core/Paper";
import React from "react";
import { GetPlayerDetail_player_points_pointTags } from "../../../../src/gql/client/types/GetPlayerDetail";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";

interface IProps {
  tags: GetPlayerDetail_player_points_pointTags[];
}

const PlayerMiningCard: React.FC<IProps> = ({ tags }) => {
  const t = Object.fromEntries(tags.map((x) => [x.key, x.value]));

  return (
    <Paper className="p-md-4">
      <div className="d-flex justify-content-center align-items-center">
        <div className="mx-4">
          <Image
            src={`/img/points/tools/${t.Tool}.webp`}
            alt=""
            height={150}
            width={150}
          />
        </div>
        <div style={{ position: "relative" }} className="mx-4">
          <Image
            src={`/img/points/blocks/${t.Block}.webp`}
            alt=""
            height={150}
            width={150}
          />
          <Typography style={{ position: "absolute", right: 0, bottom: 0 }}>
            {t.TotalDrops ?? 1}×
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PlayerMiningCard;

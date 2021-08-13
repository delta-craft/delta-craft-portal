import Typography from "@material-ui/core/Typography";
import React from "react";
import { PlayerStats_player_stats_mining } from "../../../src/gql/client/types/PlayerStats";
import Image from "next/image";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

interface IProps {
  stats: PlayerStats_player_stats_mining;
}

const MiningSummary: React.FC<IProps> = ({ stats }) => {
  const { totalPoints, data } = stats;
  return (
    <div className="d-flex flex-column text-center">
      <Typography variant="body1">Celkem {totalPoints} bodů</Typography>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-6 col-md-2 p-2" key={index}>
            <Tooltip title={item.material}>
              <Paper className="d-flex py-1 justify-content-center align-items-center summary-card">
                <Image
                  src={`/img/points/blocks/${item.material}.webp`}
                  width={100}
                  height={100}
                  alt=""
                  className="mx-2"
                />
                <Typography className="mx-2">{item.count}×</Typography>
              </Paper>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiningSummary;

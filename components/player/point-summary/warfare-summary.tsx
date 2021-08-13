import React from "react";
import { PlayerStats_player_stats_mob } from "../../../src/gql/client/types/PlayerStats";
import Image from "next/image";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

interface IProps {
  stats: PlayerStats_player_stats_mob;
}

const WarfareSummary: React.FC<IProps> = ({ stats }) => {
  const { totalPoints, data } = stats;
  return (
    <div className="d-flex flex-column text-center">
      <Typography variant="body1">Celkem {totalPoints} bodů</Typography>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-6 col-md-2 p-2" key={index}>
            <Tooltip title={item.entity}>
              <Paper className="d-flex py-1 justify-content-center align-items-center summary-card">
                <div
                  className="mx-2"
                  style={{ height: 100, position: "relative", width: 100 }}
                >
                  <Image
                    src={`/img/points/mobs/${item.entity}.webp`}
                    layout="fill"
                    alt=""
                  />
                </div>
                <Typography className="mx-2">{item.count}×</Typography>
              </Paper>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarfareSummary;

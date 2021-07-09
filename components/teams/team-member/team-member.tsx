/* eslint-disable @next/next/no-img-element */
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { TotalPoints } from ".";
import { GetTeam_getTeam_userConnections } from "../../../src/gql/client/types/GetTeam";
import { PlayerStatChart } from "../../stat-chart";

interface IProps {
  userConnection: GetTeam_getTeam_userConnections;
}

const TeamMember: React.FC<IProps> = ({ userConnection }) => {
  const { name } = userConnection;
  return (
    <Paper className="px-2 py-4">
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <img src={`https://minotar.net/avatar/${name}/64`} alt="" />
          <div style={{ width: 10 }} />
          <div className="d-flex flex-column">
            <Typography variant="h5">{name}</Typography>
            <TotalPoints ucId={userConnection.id} />
          </div>
        </div>
        <Divider className="my-2" />
        <PlayerStatChart userConnectionId={userConnection.id} />
      </div>
    </Paper>
  );
};

export default TeamMember;

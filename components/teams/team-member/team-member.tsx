/* eslint-disable @next/next/no-img-element */
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
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
          <Link href={`/players/${name}`} passHref>
            <img
              src={`https://minotar.net/avatar/${name}/64`}
              alt=""
              className="pointer hover-shadow"
            />
          </Link>
          <div style={{ width: 15 }} />
          <div className="d-flex flex-column">
            <Link href={`/players/${name}`} passHref>
              <Typography variant="h5" className="pointer">
                {name}
              </Typography>
            </Link>
            <TotalPoints ucId={userConnection.id} />
          </div>
        </div>
        <Divider className="my-3" />
        <PlayerStatChart userConnectionId={userConnection.id} />
      </div>
    </Paper>
  );
};

export default TeamMember;

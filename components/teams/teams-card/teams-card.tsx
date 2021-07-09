import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { GetTeams_getTeams } from "../../../src/gql/client/types/GetTeams";
import Member from "./member";
import TeamStatDisplay from "./team-stat-display";

interface IProps {
  team: GetTeams_getTeams;
}

const TeamsCard: React.FC<IProps> = ({ team }) => {
  const { name, userConnections, id } = team;
  return (
    <Paper className="px-1 py-4">
      <div className="text-center">
        <Typography variant="h4">{name}</Typography>
        <div className="px-4 py-2">
          <TeamStatDisplay teamId={team.id} />
        </div>
        <div className="d-flex justify-content-center flex-wrap my-3">
          {userConnections.map((x, i) => (
            <div className="px-2" key={i}>
              <Member userConn={x} />
            </div>
          ))}
        </div>
        <Link href={`/teams/${id}`} passHref>
          <Button>Zobrazit tým</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default TeamsCard;

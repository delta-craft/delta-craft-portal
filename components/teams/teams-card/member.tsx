/* eslint-disable @next/next/no-img-element */
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { GetTeams_getTeams_userConnections } from "../../../src/gql/client/types/GetTeams";

interface IProps {
  userConn: GetTeams_getTeams_userConnections;
}

const Member: React.FC<IProps> = ({ userConn }) => {
  const { next, name } = userConn;

  const link = `/players/${next.id}`;

  return (
    <div>
      <Link href={link} passHref>
        <img
          src={`https://minotar.net/avatar/${name}/100`}
          className="hover-shadow pointer"
          alt=""
        />
      </Link>
      <Link href={link} passHref>
        <Typography className="mt-2 pointer">{name}</Typography>
      </Link>
    </div>
  );
};

export default Member;

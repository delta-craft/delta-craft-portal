/* eslint-disable @next/next/no-img-element */
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { GetTeams_getTeams_userConnections } from "../../../src/gql/client/types/GetTeams";
import Image from "next/image";

interface IProps {
  userConn: GetTeams_getTeams_userConnections;
}

const Member: React.FC<IProps> = ({ userConn }) => {
  const { next, name } = userConn;

  const link = `/players/${name}`;

  return (
    <div>
      <Link href={link} passHref>
        <Image
          src={`https://minotar.net/helm/${name}/100.svg`}
          alt=""
          className="pointer hover-shadow"
          height={100}
          width={100}
        />
        {/* <img
          src={`https://minotar.net/helm/${name}/100`}
          className="hover-shadow pointer"
          alt=""
        /> */}
      </Link>
      <Link href={link} passHref>
        <Typography className="mt-2 pointer">{name}</Typography>
      </Link>
    </div>
  );
};

export default Member;

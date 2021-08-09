/* eslint-disable @next/next/no-img-element */
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { GetTeams_teams_userConnections } from "../../../src/gql/client/types/GetTeams";
import Image from "next/image";

import twemoji from "twemoji";

const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);


interface IProps {
  userConn: GetTeams_teams_userConnections; 
  ownerId?: string;
}

const Member: React.FC<IProps> = ({ userConn, ownerId }) => {
  const { next, name, id } = userConn;

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
        <div className="d-flex justify-content-center align-items-baseline">
          {ownerId==id && <div style={{height:16, width:16, margin:"0 0.3rem 0 0"}} dangerouslySetInnerHTML={{__html : emojify("👑")}}/>}
          <Typography className="mt-2 pointer">{name}</Typography>
        </div>
      </Link>
    </div>
  );
};

export default Member;

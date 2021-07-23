import Paper from "@material-ui/core/Paper";
import React from "react";
import { GetPlayerDetail_player_points_pointTags } from "../../../../src/gql/client/types/GetPlayerDetail";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface IProps {
  tags: GetPlayerDetail_player_points_pointTags[];
}

const PlayerKillCard: React.FC<IProps> = ({ tags }) => {
  const t = Object.fromEntries(tags.map((x) => [x.key, x.value]));

  return (
    <Paper className="p-4">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center mx-5">
          <Image
            src={`https://minotar.net/helm/${t.Killer}/500.svg`}
            height={150}
            width={150}
            alt=""
          />
          <Typography variant="h6" className="my-2">
            {t.Killer}
          </Typography>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mx-5">
          <Typography>Zabil</Typography>
          <ArrowForwardIcon />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mx-5">
          <Link href={`/players/${t.Killed}`} passHref>
            <Image
              src={`https://minotar.net/helm/${t.Killed}/500.svg`}
              height={150}
              width={150}
              alt=""
              className="pointer hover-shadow"
            />
          </Link>
          <Link href={`/players/${t.Killed}`} passHref>
            <Typography variant="h6" className="my-2 pointer">
              {t.Killed}
            </Typography>
          </Link>
        </div>
      </div>
      {t.X && t.Y && t.Z && t.World && (
        <div className="d-flex flex-row justify-content-center align-items-center my-4">
          <div className="lightbox mx-3">
            <Image
              src={`/api/embed/dynmap-player-kill/${t.World}/${t.X}/${t.Y}/${t.Z}`}
              width={1920 / 4}
              height={1080 / 4}
              alt=""
              quality={100}
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mx-3">
            <Typography variant="h6" className="my-2">
              PVP zóna: {t.Zone}
            </Typography>
            <Link
              href={`https://map.deltacraft.eu/#${t.World}:${t.X}:${t.Y}:${t.Z}:80:0:0:0:0:perspective`}
              passHref
            >
              <a target="_blank" className="my-2">
                <Button variant="contained">Zobrazit na mapě</Button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PlayerKillCard;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Layout } from "../../components/layout";
import { GetServerSideProps, NextApiRequest } from "next";
import getClientSsr from "../../src/gql/client/client-ssr";
import { getPlayerDetailsNoPointsQuery } from "../../src/gql/client/queries";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TotalPoints } from "../../components/teams/team-member";
import { MetaHead } from "../../components/meta-head";
import { PlayerStatChart } from "../../components/stat-chart";
import { PointsTable, PointsTableContainer } from "../../components/player";
import Link from "next/link";
import twemoji from "twemoji";
import Image from "next/image";
import {
  GetPlayerDetailNoPoints,
  GetPlayerDetailNoPointsVariables,
  GetPlayerDetailNoPoints_player,
} from "../../src/gql/client/types/GetPlayerDetailNoPoints";

interface IProps {
  nick: string;
  player: GetPlayerDetailNoPoints_player;
}

const Page: React.FC<IProps> = ({ nick, player }) => {
  const { name, id, team } = player;
  const majorTeam = team?.majorTeam;

  const icon =
    majorTeam === "red" ? "1f534" : majorTeam === "blue" ? "1f535" : "";

  return (
    <Layout>
      <MetaHead
        title={`${name} - Detail hráče - DeltaCraft`}
        image={`https://portal.deltacraft.eu/api/embed/player/${name}`}
        width="2048"
        height="1170"
      />
      <div className="container mb-4">
        <Paper className="px-2 py-3">
          <div className="d-flex justify-content-center align-items-center">
            <Image
              src={`https://minotar.net/helm/${name}/128.svg`}
              alt=""
              className="pointer hover-shadow"
              height={128}
              width={128}
            />
            {/* <img
              src={`https://minotar.net/helm/${name}/128`}
              alt=""
              className="px-3"
            /> */}
            <div className="d-flex flex-column justify-content-center align-items-center px-3">
              <Typography variant="h4">{name}</Typography>
              <TotalPoints ucId={id} variant="body1" className="my-2" />
              <Link href={`/teams/${team?.id}`} passHref>
                <Typography variant="body1" className="pointer">
                  {majorTeam && (
                    <img
                      src={`${twemoji.base}svg/${icon}.svg`}
                      className="mx-1"
                      alt="..."
                      height="20"
                    />
                  )}
                  {team?.name}
                </Typography>
              </Link>
            </div>
          </div>
        </Paper>
        <Paper className="px-2 py-3 mt-3">
          <div className="d-flex justify-content-center ">
            <div className="player-detail-chart">
              <PlayerStatChart
                userConnectionId={id}
                height={350}
                width={"100%"}
                legendPosition="right"
                fontSize={16}
              />
            </div>
          </div>
        </Paper>
        <Paper className="px-2 py-3 mt-3 text-center">
          <Typography variant="h6" className="my-2">
            Získané body
          </Typography>
          <PointsTableContainer nick={nick} />
        </Paper>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const nick = context.query.id.toString();
  const client = await getClientSsr(context.req as unknown as NextApiRequest);

  const res = await client.query<
    GetPlayerDetailNoPoints,
    GetPlayerDetailNoPointsVariables
  >({
    query: getPlayerDetailsNoPointsQuery,
    variables: { nick },
  });

  if (res.errors || !res.data || !res.data.player) {
    return { notFound: true };
  }

  const { player } = res.data;

  return { props: { nick, player } };
};

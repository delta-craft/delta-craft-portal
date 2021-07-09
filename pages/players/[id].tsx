/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout";
import { GetServerSideProps, NextApiRequest } from "next";
import getClientSsr from "../../src/gql/client/client-ssr";
import { getPlayerDetailsQuery } from "../../src/gql/client/queries";
import {
  GetPlayerDetail,
  GetPlayerDetailVariables,
  GetPlayerDetail_player,
} from "../../src/gql/client/types/GetPlayerDetail";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TotalPoints } from "../../components/teams/team-member";
import { MetaHead } from "../../components/meta-head";
import { PlayerStatChart } from "../../components/stat-chart";

interface IProps {
  nick: string;
  player: GetPlayerDetail_player;
}

const Page: React.FC<IProps> = ({ nick, player }) => {
  const { name, id, team } = player;
  return (
    <Layout>
      <MetaHead
        title={`${name} - Detail hráče - DeltaCraft`}
        image={`https://minotar.net/avatar/${name}/128`}
      />
      <div className="container">
        <Paper className="px-2 py-3">
          <div className="d-flex justify-content-around align-items-center">
            <img src={`https://minotar.net/avatar/${name}/128`} alt="" />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Typography variant="h4">{name}</Typography>
              <TotalPoints ucId={id} variant="body1" />
              <Typography variant="body1">{team?.name}</Typography>
            </div>
          </div>
        </Paper>
        <Paper className="px-2 py-3 mt-3">
          <PlayerStatChart userConnectionId={id} height={350} width={"100%"} />
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

  const res = await client.query<GetPlayerDetail, GetPlayerDetailVariables>({
    query: getPlayerDetailsQuery,
    variables: { nick },
  });

  if (res.errors || !res.data || !res.data.player) {
    return { notFound: true };
  }

  const { player } = res.data;

  return { props: { nick, player } };
};

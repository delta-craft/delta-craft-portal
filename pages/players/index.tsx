import { GetServerSideProps, NextApiRequest } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout";
import PlayerCard from "../../components/player-list/player-card";
import getClientSsr from "../../src/gql/client/client-ssr";
import { getPlayersQuery } from "../../src/gql/client/queries";
import {
  GetPlayers,
  GetPlayers_players,
} from "../../src/gql/client/types/GetPlayers";
import { totalPoints } from "../../src/utils/point-ratio";

interface IProps {
  players: GetPlayers_players[];
}

const Page: React.FC<IProps> = ({ players }) => (
  <Layout>
    <Head>
      <title>Portal - DeltaCraft</title>
    </Head>

    <div className="container py-5">
      <div className="row">
        {players
          .slice()
          .sort((a, b) =>
            totalPoints(a.pointSummary.summary) >
            totalPoints(b.pointSummary.summary)
              ? -1
              : 1
          )
          .map((x, i) => (
            <div className="col-12 col-md-4" key={i}>
              <PlayerCard player={x} index={i} />
            </div>
          ))}
      </div>
    </div>
  </Layout>
);

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const client = await getClientSsr(context.req as unknown as NextApiRequest);
  const res = await client.query<GetPlayers>({
    query: getPlayersQuery,
  });

  if (res.errors) {
    return { notFound: true };
  }

  const { players } = res.data;

  return { props: { players } };
};

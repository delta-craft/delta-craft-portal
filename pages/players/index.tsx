import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import { GetServerSideProps, NextApiRequest } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
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

const Page: React.FC<IProps> = ({ players }) => {
  const [pls, setPls] = useState(players);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const { data, loading, refetch, startPolling, stopPolling } =
    useQuery<GetPlayers>(getPlayersQuery);

  useEffect(() => {
    if (data) {
      const { players: p2 } = data;
      if (p2) {
        setPls(p2);
      }
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>Portal - DeltaCraft</title>
      </Head>
      <div className="container py-5">
        <div className="d-flex justify-content-end">
          <Button disabled={loading} onClick={async () => await refetch()}>
            Obnovit
          </Button>
          <Button
            color={autoRefresh ? "success" : "error"}
            onClick={() => {
              if (!autoRefresh) startPolling(5000);
              else stopPolling();

              setAutoRefresh(!autoRefresh);
            }}
          >
            Auto Refresh
          </Button>
        </div>
        <div className="row">
          {pls
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
};

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

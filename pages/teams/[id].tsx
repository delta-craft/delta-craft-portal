import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout";
import { GetServerSideProps, NextApiRequest } from "next";
import {
  GetTeam,
  GetTeamVariables,
  GetTeam_getTeam,
} from "../../src/gql/client/types/GetTeam";
import { getTeamQuery } from "../../src/gql/client/queries";
import { StatChart } from "../../components/stat-chart";
import getClientSsr from "../../src/gql/client/client-ssr";
import Divider from "@material-ui/core/Divider";
import { TeamStatDisplay } from "../../components/teams/teams-card";
import { TeamMember } from "../../components/teams/team-member";
import Typography from "@material-ui/core/Typography";
import { MetaHead } from "../../components/meta-head";

interface IProps {
  id: string;
  team: GetTeam_getTeam;
}

const Page: React.FC<IProps> = ({ team }) => {
  const { name, teamColourHex, userConnections, id } = team;

  return (
    <Layout>
      <MetaHead
        title={`Tým ${name} | Portal - DeltaCraft`}
        image={`https://portal.deltacraft.eu/api/embed/team/${id}`}
        width="2048"
        height="1170"
      />

      <div className="container text-center">
        <Typography variant="h3" className="mb-3">
          {name}
        </Typography>
        <div className="my-2">
          <TeamStatDisplay teamId={id} />
        </div>
        {/* <Divider className="mb-3 mt-4" /> */}
        <div className="row">
          {userConnections.map((uc, i) => (
            <div className="col-12 col-md-4 py-2" key={`uc-${i}`}>
              <TeamMember userConnection={uc} />
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
  const id = context.query.id.toString();

  const client = await getClientSsr(context.req as unknown as NextApiRequest);
  const res = await client.query<GetTeam, GetTeamVariables>({
    query: getTeamQuery,
    variables: { id },
  });

  if (res.errors || !res.data || !res.data.getTeam) {
    return { notFound: true };
  }

  const { getTeam: team } = res.data;

  return { props: { id, team } };
};

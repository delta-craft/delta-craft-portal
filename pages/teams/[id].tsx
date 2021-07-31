/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Layout } from "../../components/layout";
import { GetServerSideProps, NextApiRequest } from "next";
import {
  GetTeam,
  GetTeamVariables,
  GetTeam_team,
} from "../../src/gql/client/types/GetTeam";
import { getTeamQuery } from "../../src/gql/client/queries";
import getClientSsr from "../../src/gql/client/client-ssr";
import { TeamStatDisplay } from "../../components/teams/teams-card";
import { TeamMember } from "../../components/teams/team-member";
import Typography from "@material-ui/core/Typography";
import { MetaHead } from "../../components/meta-head";
import twemoji from "twemoji";
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

interface IProps {
  id: string;
  team: GetTeam_team;
}

const Page: React.FC<IProps> = ({ team }) => {
  const { name, teamColourHex, userConnections, id, majorTeam } = team;

  const icon =
    majorTeam === "red" ? "1f534" : majorTeam === "blue" ? "1f535" : "";

  return (
    <Layout>
      <MetaHead
        title={`Tým ${name} | Portal - DeltaCraft`}
        image={`https://cdn.deltacraft.eu/embed/team/${id}`}
        width="2048"
        height="1170"
      />

      <div className="container text-center">
        <div className="d-flex justify-content-center align-items-center">
          {majorTeam && (
            <img
              src={`${twemoji.base}svg/${icon}.svg`}
              className="mx-1"
              alt="..."
              height="45"
            />
          )}
          <Typography variant="h3" className="mx-1 my-2">
            {name}
          </Typography>
        </div>
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

  if (res.errors || !res.data || !res.data.team) {
    return { notFound: true };
  }

  const { team } = res.data;

  return { props: { id, team } };
};

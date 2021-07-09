import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { GetServerSideProps, NextApiRequest } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Layout } from "../../components/layout";
import { TeamsCard } from "../../components/teams/teams-card";
import getClientSsr from "../../src/gql/client/client-ssr";
import { getTeamsQuery } from "../../src/gql/client/queries";
import {
  GetTeams,
  GetTeams_getTeams,
} from "../../src/gql/client/types/GetTeams";
import { MajorTeam } from "../../src/models/enums";

interface IProps {
  teams: GetTeams_getTeams[];
}

const Page: React.FC<IProps> = ({ teams }) => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const blueTeam = teams.filter((x) => x.majorTeam == MajorTeam.blue);
  const redTeam = teams.filter((x) => x.majorTeam == MajorTeam.red);

  return (
    <Layout>
      <Head>
        <title>Týmy | Portal - DeltaCraft</title>
      </Head>
      <TabContext value={tab.toString()}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="disabled tabs example"
        >
          <Tab label="Blue" />
          <Tab label="Red" />
        </Tabs>
        <TabPanel value={"0"}>
          <div className="container py-4">
            <div className="row">
              {blueTeam.map((x, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <TeamsCard team={x} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={"1"}>
          <div className="container py-4">
            <div className="row">
              {redTeam.map((x, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <TeamsCard team={x} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Layout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const client = await getClientSsr(context.req as unknown as NextApiRequest);
  const res = await client.query<GetTeams>({
    query: getTeamsQuery,
  });

  if (res.errors) {
    return { notFound: true };
  }

  const { getTeams: teams } = res.data;

  return { props: { teams } };
};

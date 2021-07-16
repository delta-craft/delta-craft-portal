import React from "react";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { JoinTeam } from "../../components/teams/editor";

const Page: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Připojit se k týmu | DeltaCraft" />
      <div className="container">
        <JoinTeam />
      </div>
    </Layout>
  );
};

export default Page;

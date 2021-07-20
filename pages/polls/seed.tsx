import React from "react";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import SeedPollContainer from "../../components/polls/seed/seed-poll-container";

const Page: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Výběr seedu | DeltaCraft" />
      <div className="container">
        <SeedPollContainer />
      </div>
    </Layout>
  );
};

export default Page;

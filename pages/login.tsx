import React from "react";
import { Layout } from "../components/layout";
import { LoginContainer } from "../components/login";
import { MetaHead } from "../components/meta-head";

const Page: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Schválit přihlášení | DeltaCraft" />
      <div className="container">
        <LoginContainer />
      </div>
    </Layout>
  );
};

export default Page;

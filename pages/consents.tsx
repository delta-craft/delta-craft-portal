import Head from "next/head";
import React from "react";
import { ConsentContainer, ConsentReminderBox } from "../components/consents";
import { Layout } from "../components/layout";


const Page: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Souhlasy - DeltaCraft</title>
      </Head>
      <div className="container">
        <ConsentContainer />
      </div>
    </Layout>
  );
};

export default Page;

import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout";

const Page: React.FC = () => (
  <Layout>
    <Head>
      <title>Portal - DeltaCraft</title>
    </Head>

    <div className="container py-5"></div>
  </Layout>
);

export default Page;

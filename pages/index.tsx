import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { Layout } from "../components/layout";
import { StatChart } from "../components/stat-chart";
import { MainTeamsBar } from "../components/team-bar";

const Page: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Portal - DeltaCraft</title>
      </Head>

      <div className="container mt-5">
        <h2 className="mb-4">Statistika týmů</h2>
        <MainTeamsBar />
      </div>
    </Layout>
  );
};

export default Page;

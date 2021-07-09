import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout";
import { GetServerSideProps } from "next";

interface IProps {
  id: string;
}

const Page: React.FC<IProps> = ({ id }) => (
  <Layout>
    <Head>
      <title>Portal - DeltaCraft</title>
    </Head>

    <div className="container py-5">
      <h5>{id}</h5>
    </div>
  </Layout>
);

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const id = context.query.id.toString();
  return { props: { id } };
};

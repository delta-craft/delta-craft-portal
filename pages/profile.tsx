import Head from "next/head";
import React from "react";
import { Layout } from "../components/layout";
import { MobileQR } from "../components/mobile-qr";
import { NicknameCard } from "../components/profile/nickname";

const Page: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Můj profil | Portal - DeltaCraft</title>
      </Head>

      <div className="container py-4">
        <NicknameCard />
        <MobileQR />
      </div>
    </Layout>
  );
};

export default Page;

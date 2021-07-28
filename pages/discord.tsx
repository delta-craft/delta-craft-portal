import React, { useEffect } from "react";
import { Layout } from "../components/layout";

const Page: React.FC = () => {
  useEffect(() => {
    if (window) {
      window.location.href = "https://discord.gg/NcHEfTx";
    }
  }, []);
  return <Layout></Layout>;
};

export default Page;

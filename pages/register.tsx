import Head from "next/head";
import React from "react";
import { Registration } from "../components/registration";

const RegisterPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Registrace - DeltaCraft</title>
      </Head>
      <Registration />
    </div>
  );
};

export default RegisterPage;

import Typography from "@material-ui/core/Typography";
import React from "react";
import { Layout } from "../components/layout";

const Page: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h3" className="text-center">
        Bodovací systém
      </Typography>
      <Typography variant="h4" className="text-center mt-3">
        TBA
      </Typography>
    </Layout>
  );
};

export default Page;

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import Divider from "@material-ui/core/Divider";

const Page: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Support | DeltaCraft" />
      <div className="container text-center">
        <Typography variant="h4">Support</Typography>
        <Divider className="my-2" />
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <Paper className="m-2 p-4">
              <Typography> GitHub Issue Tracker</Typography>
              <Typography variant="body1" className="mt-2">
                Nový bug/feature request?
              </Typography>
              <Typography variant="body1" className=" mb-3">
                Založ issue na GitHubu
              </Typography>
              <Link href="https://github.com/delta-craft/issue-tracker/issues">
                <a target="_blank">
                  <Button variant="outlined">GitHub Issues</Button>
                </a>
              </Link>
            </Paper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

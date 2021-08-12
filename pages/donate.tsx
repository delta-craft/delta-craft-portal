import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import Image from "next/image";

const DonatePage: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Donate | DeltaCraft" />
      <div className="container text-center">
        <Typography variant="h4">Donate</Typography>
        <div className="row">
          <div className="col-12 col-md-6">
            <Paper className="m-2 p-4">
              <Typography variant="h6" className="mb-2">
                PayPal
              </Typography>
              <Link passHref href="https://paypal.me/karelkoudelka">
                <a target="_blank" rel="noopener">
                  <Button variant="outlined">paypal.me/karelkoudelka</Button>
                </a>
              </Link>
            </Paper>
          </div>
          <div className="col-12 col-md-6">
            <Paper className="m-2 p-4">
              <Typography variant="h6" className="mb-2">
                Účet (KB)
              </Typography>
              <Typography variant="body1">19-5319710277/0100</Typography>
              <Image
                src="/img/qr-donate.png"
                width="250"
                height="250"
                alt=""
                quality="100"
              />
            </Paper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;

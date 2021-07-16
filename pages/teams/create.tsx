import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { CreateTeam } from "../../components/teams/editor";
import { useAppContext } from "../../src/hooks";

const Page: React.FC = () => {
  const { session } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const team = session.links["team"];
      if (team) {
        if (team.ownerConnId === session.links["id"]) {
          router.push("/teams/edit");
        } else {
          router.push(`/teams/${team.id}`);
        }
      }
    }
  }, [session]);

  return (
    <Layout>
      <MetaHead title="Vytvořit tým | DeltaCraft" />
      <div className="container">
        <Typography variant="h5" className="text-center my-3">
          Vytvořit nový tým
        </Typography>

        <CreateTeam />
        <Link href="/teams/join" passHref>
          <Button className="my-4">Připojit se k existujícímu týmu</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Page;

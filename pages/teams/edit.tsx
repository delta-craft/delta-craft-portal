import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { EditTeam } from "../../components/teams/editor";
import { useAppContext } from "../../src/hooks";

const Page: React.FC = () => {
  const { session } = useAppContext();
  const router = useRouter();

  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    if (session) {
      const team = session.links["team"];
      if (!team) {
        router.push("/teams/create");
        return;
      } else {
        if (team.ownerConnId !== session.links["id"]) {
          router.push(`/teams/${team.id}`);
        }
      }

      setJoinCode(team["teamJoinCode"]);
    }
  }, [session]);

  return (
    <Layout>
      <MetaHead title="Upravit tým | DeltaCraft" />
      <div className="container">
        <EditTeam />
        <Paper className="mt-2 p-4 d-flex flex-column align-items-baseline">
          <div className="d-flex flex-row">
            <Typography>Kód pro připojení</Typography>
            <code className="colour-blue mx-2">{joinCode}</code>
          </div>
          <Typography variant="caption">Neukazuje se? F5</Typography>
        </Paper>
      </div>
    </Layout>
  );
};

export default Page;

import { NextApiRequest, NextApiResponse } from "next";
import generateHomeCard from "../../../../backend/embed/gen/generate-home-card";
import generatePlayerKillDynmap from "../../../../backend/embed/gen/generate-kill-dynmap";
import generateTeamCard from "../../../../backend/embed/gen/generate-team-card";
import generateUserCard from "../../../../backend/embed/gen/generate-user-card";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, query } = req;

  const type = query.type.toString();

  if (type === "player") {
    const params = query.params.toString();

    await generateUserCard(params, res);

    return;
  }

  if (type === "dynmap-player-kill") {
    const params = query.params;

    const world = params[0].toString();
    const x = params[1].toString();
    const y = params[2].toString();
    const z = params[3].toString();

    await generatePlayerKillDynmap(world, x, y, z, res);
    return;
  }

  if (type === "home") {
    const params = query.params.toString();

    await generateHomeCard(params, res);
    return;
  }

  if (type === "team") {
    const params = query.params.toString();

    await generateTeamCard(params, res);

    return;
  }

  res.status(200).json({ url, query, info: "Endpoint query not implemented" });
};

export default handler;

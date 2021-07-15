import { NextApiRequest, NextApiResponse } from "next";
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

  if (type === "team") {
    const params = query.params.toString();

    await generateTeamCard(params, res);

    return;
  }

  if (type === "home-icon") {
    // TODO: Home icon for blue map
  }

  res.status(200).json({ url, query, info: "Endpoint query not implemented" });
};

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { calcPlayerSummary } from "../../backend/db-helper/summary-helper";
import { getScreenshot } from "../../backend/embed/get-screenshot";
import { getUserCardHtml } from "../../backend/embed/user-card-template";
import { UserConnections } from "../../src/db/entities/UserConnections";
import { dbConnect } from "../../src/utils/db-conn";

const debugHtml = false;
const isLocal = process.env.NODE_ENV === "development";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const nickName = req.query.nick?.toString();

  if (nickName?.length < 1) {
    res.status(405).end("User name not valid");
    return;
  }

  await dbConnect();

  const repo = getRepository(UserConnections);

  const uc = await repo.findOne({
    where: { name: nickName },
    relations: ["points", "points.pointTags", "team"],
  });

  if (!uc) {
    res.status(404).end("Player not found");
    return;
  }

  const { summary, ratios } = calcPlayerSummary(uc);

  try {
    const html = getUserCardHtml(uc, summary, ratios);
    if (debugHtml) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }

    const file = await getScreenshot(html, isLocal);
    res.setHeader("Content-Type", "image/png");
    res.statusCode = 200;
    // res.setHeader(
    //   "Cache-Control",
    //   `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    // );
    res.end(file);
    return;
  } catch (err) {
    console.log(err);
    res.status(405).json({ error: err });
    return;
  }
};

export default handler;

import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";
import { calcPlayerSummary } from "../../db-helper/summary-helper";
import { getScreenshot } from "../get-screenshot";
import { getUserCardHtml } from "../user-card-template";

const debugHtml = false;
const isLocal = process.env.NODE_ENV === "development";

const generateUserCard = async (nick: string, res: NextApiResponse) => {
  if (nick?.length < 1) {
    res.status(405).end("User name not valid");
    return;
  }

  await dbConnect();

  const repo = getRepository(UserConnections);

  const uc = await repo.findOne({
    where: { name: nick },
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
    if (!isLocal)
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=3600, max-age=3600`
      );
    res.end(file);
    return;
  } catch (err) {
    console.log(err);
    res.status(405).json({ error: err });
    return;
  }
};

export default generateUserCard;

import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Teams } from "../../../src/db/entities/Teams";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";
import {
  calcPlayerSummary,
  calcTeamSummary,
} from "../../db-helper/summary-helper";
import { getScreenshot } from "../get-screenshot";
import { getTeamCardHtml } from "../team-card-template";
import { getUserCardHtml } from "../user-card-template";

const debugHtml = false;
const isLocal = process.env.NODE_ENV === "development";

const generateTeamsCard = async (teamId: string, res: NextApiResponse) => {
  await dbConnect();

  const repo = getRepository(Teams);

  const team = await repo.findOne({
    where: { id: teamId },
    relations: [
      "userConnections",
      "userConnections.points",
      "userConnections.points.pointTags",
    ],
  });

  if (!team) {
    res.status(404).end("Team not found");
    return;
  }

  const { summary, ratios } = calcTeamSummary(team);

  try {
    const html = getTeamCardHtml(team, summary, ratios);
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

export default generateTeamsCard;

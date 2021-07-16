import { NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { UserConnections } from "../../../src/db/entities/UserConnections";
import { dbConnect } from "../../../src/utils/db-conn";
import { calcPlayerSummary } from "../../db-helper/summary-helper";
import { getScreenshot } from "../get-screenshot";
import { getHomeCardHtml } from "../home-card-template";
import { getUserCardHtml } from "../user-card-template";

const debugHtml = false;
const isLocal = process.env.NODE_ENV === "development";

const generateHomeCard = async (nick: string, res: NextApiResponse) => {
  if (nick?.length < 1) {
    res.status(405).end("User name not valid");
    return;
  }

  try {
    const html = getHomeCardHtml(nick);
    if (debugHtml) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }

    const file = await getScreenshot(html, isLocal, true, 32, 32);
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

export default generateHomeCard;

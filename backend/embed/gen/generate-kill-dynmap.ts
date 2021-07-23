import { NextApiResponse } from "next";
import { dbConnect } from "../../../src/utils/db-conn";
import { getScreenshotUrl } from "../get-screenshot";

const debugHtml = false;
const isLocal = process.env.NODE_ENV === "development";

const generatePlayerKillDynmap = async (
  world: string,
  x: string,
  y: string,
  z: string,
  res: NextApiResponse
) => {
  await dbConnect();

  try {
    const file = await getScreenshotUrl(
      `https://map.deltacraft.eu/#${world}:${x}:${y}:${z}:80:0:0:0:0:perspective`,
      isLocal,
      true,
      1920,
      1080
    );
    res.setHeader("Content-Type", "image/png");
    res.statusCode = 200;
    if (!isLocal)
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=43200, max-age=43200`
      );
    res.end(file);
    return;
  } catch (err) {
    console.log(err);
    res.status(405).json({ error: err });
    return;
  }
};

export default generatePlayerKillDynmap;
